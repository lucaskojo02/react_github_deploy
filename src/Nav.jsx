import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResult = useStoreActions((actions) => actions.setSearchResult);


  useEffect(()=>{
        const filteredResults = posts.filter(post=>((post.body).toLowerCase()).includes(search.toLowerCase()) ||((post.title).toLowerCase()).includes(search.toLowerCase()))

        setSearchResult(filteredResults.reverse())
    },[posts,search, setSearchResult])

  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          type="text"
          id='search'
          placeholder='Search Posts'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/post">Post</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
