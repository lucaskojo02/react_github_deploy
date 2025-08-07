import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const navigate = useNavigate();

    const postBody = useStoreState((state) => state.postBody);
    const postTitle = useStoreState((state) => state.postTitle);

    const savePost = useStoreActions((actions) => actions.savePost);
    const setPostBody = useStoreActions((actions) => actions.setPostBody);
    const setPostTitle = useStoreActions((actions) => actions.setPostTitle);

    const handleSubmit =async(e)=>{
        e.preventDefault();

        const id = uuidv4();
        const datetime = format(new Date(), 'MMMM  dd, yyyy pp');
        const newPost = {id,title:postTitle,datetime,body:postBody}
        await savePost(newPost);
        navigate('/');
        
    }
    return (
      <main className='NewPost'>
          <h1>New Post</h1>
          <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input type="text"  id='postTitle' value={postTitle} onChange={(e)=>setPostTitle(e.target.value)} required/>
            <label htmlFor="postBody">Post:</label>
            <textarea id="postBody" required value={postBody} onChange={(e)=>setPostBody(e.target.value)}></textarea>
            <button type='submit'>Submit</button>
          </form>
      </main>
    )
}

export default NewPost