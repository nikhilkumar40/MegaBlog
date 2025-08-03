import React,{useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import dbConfigService from '../appwrite/DbConfig';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        dbConfigService.getPost([]).then((post)=>{
            if(post){
                setPosts(post.document);
            }
        }).catch((error)=>console.warn(error))
    },[])
  return (
    <div className='py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post = {post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts