import React from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useStoreState,useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const {id} = useParams();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    const navigate = useNavigate();

    const handleDelete = async(id)=>{
        await deletePost(id);
        navigate('/')   
    }

  return (
    <main className='PostPage'>
        <article className='post'>
            {post && 
              <>
                <h2>{post.title}</h2>
                <p className='postDate'>{post.datetime}</p>
                <p className='postBody'>{post.body}</p>
                <NavLink to={`/edit/${post.id}`}>
                   <button className='editButton'>Edit Post</button>
                </NavLink>
                <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete Post</button>
              </>
            }
            {!post && 
              <>
                <h2>Post Not Found</h2>
                <p>Well that's disappointing</p>
                <p>
                    <NavLink to='/'>Visit our HomePage</NavLink>
                </p>
              </>
            }
        </article>
    </main>
  )
}

export default PostPage