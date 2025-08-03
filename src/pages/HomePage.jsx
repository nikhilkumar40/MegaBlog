import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import dbService from '../appwrite/DbConfig'

function HomePage() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        dbService.getAllPosts().then((post) => {
            if (post) {
                setPost(post.documents);
            }
        })
    }, [])

    return post.length === 0 ? (
         <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
    ) : (
         <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((val) => (
                        <div key={val.$id} className='p-2 w-1/4'>
                            <PostCard {...val} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default HomePage