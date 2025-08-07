import { Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPosts from './EditPosts';

function App() {
   const API_URL =import.meta.env.VITE_URL

   const setPosts = useStoreActions((actions) => actions.setPosts);
   const {data, fetchError, isLoading} = useAxiosFetch(API_URL);

    useEffect(()=>{
        setPosts(data)
    },[data, setPosts])
  
  return (
    <div className='App'>
      <Header title='React JS Blog'/>
        <Nav/>
        
        <Routes>
          <Route path='/' element={<Home isLoading={isLoading} fetchError={fetchError}/>} />

          <Route path='/post' element={<NewPost />} />

          <Route path='/edit/:id' element={<EditPosts />} />

          <Route path='/post/:id' element={<PostPage />} />

          <Route path='/about' element={<About />} />

          <Route path='*' element={<Missing />} />
        </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
