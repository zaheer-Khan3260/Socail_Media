import React, {useState} from 'react'
import api from '../api';

function CommentComponent({
    _id,
    content,
    owner, 
    isLiked,
    likeCount
}) {

    const [newIsLiked, setNewIsLiked] = useState(isLiked);
    const [newLikeCount, setNewLikeCount] = useState(likeCount)

    const toggleLikeCount = () => {
        setNewIsLiked(!newIsLiked);
        setNewLikeCount(prevCount => prevCount + (newIsLiked ? -1 : 1));
      }

      const handleLike = async () => {
        try {
          const response = await api.post("/api/v1/like/toggle/commentLike", {
            commentId: _id,
          });
        } catch (err) {
          console.error("An error occurred while liking the post:", err.message);
        }
      };

  return (
    <div className='w-full h-20 flex justify-between'>
       <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
                <img
                  src={owner.avatar}
                  alt="userProfile"
                  className="w-full h-full object-cover rounded-full"
                />
          </div>
          <div className='ml-5 w-[75%] h-full text-white '>
            <div className='mt-1 text-[13px] opacity-50'>
                {owner.username}
            </div>
            <div className='mt-2 text-[20px]'>
            {content}
            </div>
          </div>

          <div 
          className={`mt-5 items-center mr-3 space-x-1 ${newIsLiked ? "liked" : ""} action-button`}
          onClick={() => {
          handleLike()
          toggleLikeCount();
          }}
          >
          {newIsLiked ? "❤️" : "🤍"}
            <p className="text-base text-white ml-2">{newLikeCount}</p>
          </div>
      
    </div>
  )
}

export default CommentComponent
