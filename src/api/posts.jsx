import axios from 'axios'

const postsApi = axios.create({
    baseURL: import.meta.env.VITE_URL
});

export default postsApi;