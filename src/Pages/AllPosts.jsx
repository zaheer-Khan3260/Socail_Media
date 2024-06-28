
import React,  {useState, useEffect} from 'react'
import axios from "axios"
import {Container, PostCardSecond} from '../component/index'
const AllPost = () => {
    const [posts, setPosts] = useState([])
      useEffect(async () => {
      await axios.post("/api/v1/posts/getAllPost", {
        params: {
          sortBy: 'createdAt',
          sortType: 'asc',
        }
      })
        .then((posts) => {
          if(posts) {
            setPosts(posts)
          }
        })
      }, [])

  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post._id} className='p-2 w-1/4'>
                    <PostCardSecond {...post} />
                </div>
            ))}
        </div>
        </Container>
</div>
  )
}

export default AllPost
