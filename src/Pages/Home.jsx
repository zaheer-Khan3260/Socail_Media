import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import userImage from "../component/Images/user.png"
import { PostCard} from '../component/index'
import api from '../api.js';
import LoadingSpinner from '../component/LoadingSpinner/LoadinSpinner.jsx';
function Home() {
    const [posts, setPosts] = useState([])
    const [userPost, setUserPost] = useState([])
    const [profile, setProfile] = useState({})
  const [postCount, setPostCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const UserData = useSelector((state) => state.auth.userData);
 const userStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchData = async () => {
        const response = await api.get("/api/v1/posts/")
            if(response.data) {
                console.log("postData",response.data.data);
                setPosts(response.data.data)
            }
    }

        const fetchProfile = async() => {
        const response = await api.post(`/api/v1/users/getUserChannelProfile`, {
          userId: UserData?._id
        })
        const userData = response.data
        if(userData) {
          setProfile(userData.data);
        }
       }

       const fetchPosts = async() => {
        const response = await api.post(`/api/v1/posts/getUserPost`, {
              userId: UserData?._id
        })
        const userPosts = response.data
        if(userPosts) setUserPost(userPosts.data)
          let count = 0;
          userPosts.data.forEach(element => {
            if(element) count++
          });
          setPostCount(count);
          console.log("profile post data", userPosts.data);
       }

   if(userStatus) {
    setLoading(true)
   fetchData()
   fetchProfile()
   fetchPosts()
   setLoading(false)
   }

}, [userStatus])

  

    return (
        <div className='w-full py-8 xl:px-10 bg-[#0f171f] xl:grid xl:grid-cols-4'>
            <div className='h-auto w-full mb-3 md:pl-10 lg:ml-0  xl:col-span-2'>
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


            {/* profile image and follower cont */}
            <div className='border-2 border-black rounded-2xl
             bg-[#0f171f] p-2 text-white h-[35rem] w-[30rem] mt-20 hidden xl:block'>
      <div className='mx-auto w-full '>
        {/* profile image nad followers main cont */}
        <div className='flex w-full h-auto '>
            {/* image cont */}
           <div
            className='ml-2'>
                <div 
                className='w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center'>
                     
                    <img src={profile.avatar? profile.avatar : userImage} alt="" className='w-full h-full object-fill rounded-full'/>
                  
                </div>
           </div>
                 {/* followers cont */}
         <div className=' h-26 w-full p-1'>
             <div>
                  <div className='flex text-[15px] 
                  min-[950px]:text-[22px] min-[950px]:mt-3
                  text-center justify-center h-full items-center'>
                    <div>
                        <div>Post</div>
                        <div>{postCount}</div>
                    </div>
                    <div className='mr-4 ml-4'>
                    <div>Followers</div>
                        <div>{profile.followerCount}</div>
                    </div>
                    <div>
                         <div>Following</div>
                        <div>{profile.followingCount}</div>
                        </div>
                  </div>
           </div>
           
       </div>
           </div>

             {/* bio cont */}
           <div className='text-[14px] min-[950px]:text-[13px] w-36 md:w-48 pl-2 mt-1 h-16' >
            <div>
              <p className=' text-[15px] '>{profile ? `${profile.username}` : null}</p>
            </div>
                <div>
                {
                    <p>
                      {profile ? `${profile.bio} ` : null}
                    </p>
                   }
                </div>
           </div>
           <div className=' w-full h-6 flex text-center text-[16px] mt-10'>
            <div className={`w-full font-semibold border-r-2 border-b-2 border-black bg-blue-600 cursor-pointer`}
             >Posts</div>
      </div>
           <div className='h-[20rem] w-full p-[2px] overflow-auto'>
        <div className='flex flex-wrap justify-between'>
        {
       userPost ? ( userPost.map((post) => (
          <div key={post._id}
          className='w-[calc(50%-0.30rem)] h-[15rem] bg-black'>
                <img src={post.postFile} alt="" 
                className='h-full object-contain'
                />
          </div>   
          ))) :
          <div className=' text-blue-600 font-bold'>Don't Upload any posts</div>
          }
          </div>
        </div>
           </div>
           </div>
           <div className={`absolute flex h-screen backdrop-blur-lg  top-0 w-full ${loading ? "block" : "hidden"}`}>
                <LoadingSpinner/>
            </div>
    </div>
      )
}


export default Home
