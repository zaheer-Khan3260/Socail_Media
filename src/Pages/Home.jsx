import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Container, Login, PostCard} from '../component/index'
import api from '../api.js';
function Home() {
    const [posts, setPosts] = useState([])
 const userStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchData = async () => {
        const response = await api.get("/api/v1/posts/")
            if(response.data) {
                console.log("postData",response.data.data);
                setPosts(response.data.data)
            }
    }
   if(userStatus) {fetchData()}
}, [userStatus])

  

    return (
        <div className='w-full py-8 bg-[#0f171f]'>
        {/* <Container> */}
            <div className='h-auto w-full mb-3 md:w-[530px] md:ml-[11.5rem] lg:w-[630px] lg:ml-[18rem] xl:ml-[28rem] xl:w-[630px]'>
                {
                posts ? (
                posts.map((post) => (
                    <div key={post._id} className=' w-full p-2'>
                        <PostCard {...post}
                        />
                    </div>
                ))
                ):
                <div className=' text-[3rem] text-blue-500 text-center'>Be first to upload a post</div>
            }
            </div>
        {/* </Container> */}
    </div>
      )
}


export default Home
