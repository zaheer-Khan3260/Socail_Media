import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import likeButton from '../component/Images/heart.png'
import afterLikeButton from '../component/Images/heartcolored.png'
import commentImage from "../component/Images/comment.png"
import shareImage from '../component/Images/send.png'

function PostCard(
    $id,
    userName,
    fearturedImage,
    content,

) {
    const [isliked, setIsLiked] = useState(false)
    const [likeCount, setLikedCount] = useState(0);
  
    const count = () => {
      if(isliked) {
        setLikedCount(prevLikeCount => prevLikeCount + 1);
      }
    }
  
  
    return (
        <Link to={`/post/${$id}`}>
      <div className='w-60 h-80 border-2 border-black mt-2 mx-auto'> 
  
      {/* profile image and username cont */}
  
        <div className='w-full mx-auto h-12 flex border-2 border-blue-700'>
              <div className='w-8 h-8 ml-1 mt-1'>
                <img
                 src={content} 
                 alt="" 
                 className='rounded-full bg-cover'
                 />
              </div>
                 <div className='ml-1 mt-2'>
                  {userName}
                 </div>
        </div>
  
        {/* content cont */}
  
        <div className='border-2 border-green-800 h-56'>
            {fearturedImage}
        </div>
        {/* like,comment and share cont */}
        <div className='border-2 border-red-800 h-11'>
          <div className='flex mt-2 ml-1'>
            <div className=''>
            <img src={likeButton} alt=""
             className={`w-6 h-6 mr-2 ${isliked ? 'hidden' : 'block'}`}
              onClick={() => {
              setIsLiked(true)
               count()
               }}
               />
            <img src={afterLikeButton} alt=""  className={`w-6 h-6 mr-2 ${isliked ? 'block' : 'hidden'}`} onClick={() => setIsLiked(false)}/>
            <p className='ml-2 mt-[-10px]'>{likeCount}</p>
            </div>
            <img src={commentImage} alt=""  className='w-6 h-6 mr-2' />
            <img src={shareImage} alt=""  className='w-5 h-5 mt-[3px]' />
            </div>
        </div>
      </div>
      </Link>      
    )
  
}

export default PostCard
