import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataurl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
        });

        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error.response?.statusText || error.message);
          setData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData(dataurl);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [dataurl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
