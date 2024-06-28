import React, { useEffect, useState } from 'react'
import userImage from './Images/user.png'
import conent from './Images/download.png'
import savedPostImage from './Images/savedpost.webp'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  const [activePost, setActivePost] = useState(true);
  const [activeSavedPost, setActiveSavedPost] = useState(false);
  const [posts, setPosts] = useState();
  const [profile, setProfile] = useState({})
  const [savedPost, setSavedPost] = useState([]);
  const { UserId } = useParams()
  const UserData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
 
const isAuthor = UserId && UserData && UserId === UserData._id ? true : false;
  useEffect(() => {
    if(UserId) {
      const fetchProfile = async() => {
      const response = await axios.post(`/api/v1/users/getUserChannelProfile`, {
        userId: UserId
      })
      const userData = response.data
      if(userData) setProfile(userData.data)
     }

     const fetchPosts = async() => {
      const response = await axios.post(`/api/v1/posts/getUserPost`, {
            userId: UserId
      })
      const userPosts = response.data
      if(userPosts) setPosts(userPosts.data)
     }
    fetchProfile()
    fetchPosts();

    }
  }, [UserData, navigate, UserId])


  return (

    <div className='p-[2px] w-full h-auto md:flex md:justify-end min-[950px]:block'>
<div className=' w-full  h-full mx-auto md:mx-0 
md:w-[425px] md:mt-2 md:mr-8 min-[950px]:w-[550px] min-[950px]:ml-[20rem] min-[950px]:mr-0 min-[950px]:mt-8
xl:w-full xl:flex xl:justify-center xl:ml-0
 '>

    {/* profile image and follower cont */}
      <div className=' h-auto mx-auto w-full xl:w-[550px] '>
        {/* profile image nad followers main cont */}
        <div className='flex w-full h-auto '>
            {/* image cont */}
           <div
            className=' min-[372px]:w-24 min-[372px]:ml-3  min-[320px]:ml-1 h-full min-[320px]:w-16 
           min-[950px]:w-44 min-[950px]:h-48 min-[950px]:ml-0 min-[950px]:flex 
            min-[950px]:items-center '>
                <div 
                className='min-[372px]:w-20 min-[320px]:w-16 mt-2 min-[950px]:w-24
                 h-[95px] rounded-full mx-auto border border-black overflow-hidden'>
                     {
                    profile.avatar ? <img src={profile.avatar} alt="" className=' object-cover w-full h-full'/>
                    :
                    <img src={userImage} alt="" className=' object-cover'/>
                  }
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
                        <div>0</div>
                    </div>
                    <div className='mr-4 ml-4'>
                    <div>Followers</div>
                        <div>0</div>
                    </div>
                    <div>
                         <div>Following</div>
                        <div>0</div>
                        </div>
                  </div>
           </div>
           <div className='text-[14px] hidden min-[950px]:text-[18px] w-36 pl-1 mt-2 h-16 min-[372px]:ml-3
             min-[320px]:ml-1 min-[950px]:block min-[950px]:ml-0 min-[950px]:w-48 ' >
                 <div>
              <p className=' text-[20px] mb-1 mt-5 '>{profile ? `${profile.username}` : null}</p>
            </div>
                <div>
                   {
                    <p>
                      {profile ? `${profile.bio} ` : null}
                    </p>
                   }
                </div>
           </div>
           <div className=' w-full h-[2.8rem] min-[950px]:flex justify-end items-center hidden'>
            {
              isAuthor ?   <div className=' border-2 border-black w-24 text-center h-7 rounded-xl mr-2'
              onClick={() => navigate(`/profile/${UserId}/editprofile`)}
              >
                  Edit Profile
              </div> : null
            }
              
           </div>
       </div>
           </div>

             {/* bio cont */}
           <div className='text-[14px] min-[950px]:text-[18px] w-36 pl-1 mt-1 h-16 min-[372px]:ml-3  min-[320px]:ml-1 min-[950px]:hidden' >
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
           <div className=' w-full h-[2.8rem] flex justify-end items-center min-[950px]:hidden'>
           {
              isAuthor ?   <div className=' border-2 border-black w-24 text-center h-7 rounded-xl mr-2'
              onClick={() => navigate(`/profile/${UserId}/editprofile`)}
              >
                  Edit Profile
              </div> : null
            }
           </div>
           </div>
                
      {/* post detail cont */}
      <div className=' w-full h-6 flex text-center text-[16px] mt-1 min-[950px]:hidden'>
            <div className={`w-1/2 border-r-2 border-b-2 border-black hover:bg-gray-200 ${activePost ? `bg-gray-200` : null}`}
             onClick={() => {
                setActivePost(true);
                setActiveSavedPost(false);
            }}>Posts</div>
            <div className={`w-1/2 hover:bg-gray-200 border-b-2 border-black ${savedPost ? `bg-gray-200` : null}`}
            onClick={() => {
            setActiveSavedPost(true);
            setActivePost(false);
            }}> Saved</div>
      </div>
    
      {/* post cont */}
      { activePost ?
      <div className='h-auto w-full p-[2px] min-[950px]:hidden'>
        <div className='grid grid-cols-3 gap-[0.01rem]'>
        {
       posts ? ( posts.map((post) => (
         post.UserId === UserId ? 

          <div key={post.$id}
          className='min-[375px]:h-36 min-[375px]:w-[5.8rem] min-[425px]:w-[6.6rem]
            min-[320px]:h-28 min-[320px]:w-[4.9rem] min-[950px]:w-[8.2rem] min-[950px]:h-48 bg-black mb-1 flex items-center justify-center'>
                <img src={posts.postFile} alt="" 
                className='h-full'
                />
          </div> 
          :null
          
          
          ))) :
          <div className=' text-blue-600 font-bold'>Don't Upload any posts</div>
          }
          </div>
        </div>
      : null
      }
      {
        activeSavedPost ?
        <div className='h-auto w-full p-[2px] min-[950px]:hidden'>
        <div className='flex justify-between'>
          <div 
          className='min-[375px]:h-36 min-[375px]:w-[5.8rem] min-[425px]:w-[6.6rem]
            min-[320px]:h-28 min-[320px]:w-[4.9rem] min-[950px]:w-[8.2rem] min-[950px]:h-48 bg-black mb-1 flex items-center justify-center'>
                <img src={conent} alt=""/>
          </div>
          <div
           className='min-[375px]:h-36 min-[375px]:w-[5.8rem] min-[425px]:w-[6.6rem] 
            min-[320px]:h-28 min-[320px]:w-[4.9rem] min-[950px]:w-[8.2rem] min-[950px]:h-48 bg-black  mb-1'>

          </div>
          <div
           className='min-[375px]:h-36 min-[375px]:w-[5.8rem] min-[425px]:w-[6.6rem]
             min-[320px]:h-28 min-[320px]:w-[4.9rem] bg-black mb-1'>

          </div>
          </div>
        </div>
        : null
      }
      </div>
      <div className='w-full hidden min-[950px]:block '>
      <div className=' w-full  h-6 flex text-center text-[16px] mt-2 min-[950px]:ml-[25rem] xl:justify-center xl:ml-0'>
            <div className={`w-40 border-r-2 border-black hover:bg-gray-200 ${activePost ? `bg-gray-200` : null}`}
             onClick={() => {
                setActivePost(true);
                setActiveSavedPost(false);
            }}>Posts</div>
            <div className={`w-40 hover:bg-gray-200 border-black ${savedPost ? `bg-gray-200` : null}`}
            onClick={() => {
            setActiveSavedPost(true);
            setActivePost(false);
            }}> Saved</div>
           </div>
           { activePost ?
     <div className='w-full min-[950px]:flex justify-center hidden'>
     <div className='h-auto min-[320px]:w-[34rem] min-[320px]:ml-[16.5rem]
      p-[2px] xl:ml-0'>
        <div className=' grid grid-cols-3 gap-1'>
     {
      posts ? ( posts.map((post) => (
         post.UserId === UserId ? 

          <div key={post.$id}
          className='ml-1 min-[950px]:w-full min-[950px]:h-48 bg-black mb-1 flex items-center justify-center'>
                <img src={posts.postFile}  className='h-full ' alt=""/>
          </div> 
          :null
          
          
          ))) : 
          <div className=' text-blue-600 font-bold'>Don't Upload any posts</div>
          }
          </div>
       </div>
     </div>
      : null
      
      }

{ activeSavedPost ?
          <div className='w-full min-[950px]:flex justify-center hidden'>
          <div className='h-auto min-[320px]:w-[34rem] min-[320px]:ml-[16.5rem]
           p-[2px] xl:ml-0'>
          <div className='flex justify-between'>
            <div 
            className='min-[320px]:w-[11.1rem] min-[320px]:h-44 bg-black mb-1 flex justify-center'>
                  <img src={savedPostImage} alt=""/>
            </div>
            <div
             className='min-[320px]:w-[11.1rem] min-[320px]:h-44 bg-black 
               mb-1'>
     
            </div>
            <div
             className='min-[320px]:w-[11.1rem] min-[320px]:h-44 bg-black 
             mb-1'>
     
            </div>
            </div>
            </div>
          </div>
      : null
      }
           </div>

</div>
   
  )
}

export default Profile;
