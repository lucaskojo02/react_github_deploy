import {useEffect} from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import {format} from 'date-fns';

const EditPosts = () => {
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const editPost = useStoreActions((actions) => actions.editPost);
    const getPostById = useStoreState((state) => state.getPostById);

    const {id}= useParams();
    const post = getPostById(id);
    const navigate = useNavigate();

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    },[post, setEditTitle, setEditBody])

    const handleEdit =async(id)=>{
        const datetime = format(new Date(),"MMMM dd, yyyy pp")
        const updatedPost = {id, title: editTitle, datetime, body:editBody}
        await editPost(updatedPost);
        navigate(`/post/${id}`);
    }

  return (
    <main className='NewPost'>
        {editTitle &&
            <>
               <h1>Edit Post</h1>
                <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input type="text"  id='postTitle' value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} required/>
                    <label htmlFor="postBody">Post:</label>
                    <textarea id="postBody" required value={editBody} onChange={(e)=>setEditBody(e.target.value)}></textarea>
                    <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
                </form>
            </>
        }
        {!editTitle && 
           <>
                <h2>Page Not Found</h2>
                <p>Well, that's dissappointing.</p>
                <p>
                    <NavLink to="/">Visit Our Homepage</NavLink>
                </p>
           </>
        }
    </main>
  )
}

export default EditPosts