import React, { useEffect, useState } from "react";
import userImage from "./Images/user.png";
import afterLikeButton from "./Images/heartcolored.png";
import commentImage from "./Images/comment.png";
import shareImage from "./Images/send.png";
import likeButton from "./Images/heart.png";
import { Link } from "react-router-dom";
import api from "../api.js"

function PostCardSecond({ _id, owner, postFile, isLiked, likeCount, comment, caption }) {
  const[userData, setUserData] = useState(null);
  const [currentLikeStatus, setCurrentLikeStatus] = useState(isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  useEffect(() => {
      const fetchData = async() => {
    const response = await api.post("/api/v1/users/getUserById", {userId: owner})
      const userData = response.data
      if(userData){
        setUserData(userData.data)
      }
    }
    fetchData()
  }, [owner])


  const handleLike = async () => {
    try {
      const response = await api.post("/api/v1/like/toggle/v/postLike", {
        postId: _id,
      });
      
      if (response.data.data.success) {
        setCurrentLikeStatus(!currentLikeStatus);
        setCurrentLikeCount((prevCount) => (currentLikeStatus ? prevCount - 1 : prevCount + 1));
      }
    } catch (err) {
      console.error("An error occurred while liking the post:", err.message);
    }
  };

  return (
    <div className="w-60 h-full border-2 border-gray-500 bg-slate-900 text-white rounded-xl mt-2 mx-auto md:w-[468px]">
      {/* profile image and username cont */}

      <div className="w-full mx-auto h-12 flex border-b-2 border-gray-500">
        {userData ? (
          <div className="w-12 ml-2 mt-1">
            <img
              src={userData?.avatar}
              alt=""
              className="rounded-full object-cover w-10 h-10"
            />
          </div>
        ) : (
          <div className="w-8 h-8 ml-2 mt-1">
            <img
              src={userImage}
              alt=""
              className="rounded-full object-conver"
            />
          </div>
        )}

        <Link to={`/profile/${owner}`}>
          <div className="ml-2 mt-2">{userData ? userData.username : null}</div>
        </Link>
      </div>
      <div className="w-full pt-1 overflow-hidden pl-1 font-light text-sm">
        <p className=" overflow-hidden">{caption}</p>
      </div>
      {/* content cont */}
      <Link to={`/post/${_id}`}>
      
        <div className="bg-[#272727] w-full mt-1 flex items-center justify-center">
              <img
              src={postFile}
              alt={caption}
              className="bg-[#272727] h-full object-cover"
            />
        </div>
      </Link>
      {/* like,comment and share cont */}
      <div className=" h-14">
        <div className="flex mt-2 ml-1">
          <div>
          <button className={`action-button ${isLiked ? 'liked' : ''} w-6 h-6 mr-2`} onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'}
        </button>
            {/* <img
              src={likeButton}
              alt=""
              className={`w-6 h-6 mr-2 ${currentLikeStatus ? "hidden" : "block"} invert cursor-pointer`}
              onClick={handleLike}
            />
            <img
              src={afterLikeButton}
              alt=""
              className={`w-6 h-6 mr-2 ${currentLikeStatus ? "block" : "hidden"} cursor-pointer`}
              onClick={handleLike}
            /> */}
            <p className="ml-2 mt-[-2px]">{currentLikeCount}</p>
          </div>
          <img src={commentImage} alt="" className="w-6 h-6 mr-2 invert cursor-pointer" />
          <img src={shareImage} alt="" className="w-5 h-5 mt-[3px] invert cursor-pointer" />
        </div>
      </div>
      <div className=" w-full h-10 flex items-center">
        <div className="w-7 h-7 border border-gray-500 rounded-full flex justify-center text-center ml-1">
          <img src={userImage} alt="" className=" rounded-full w-6 h-6 object-cover" />
        </div>
        <div className="ml-1">
          <input
            type="text"
            placeholder="Comment...."
            className="w-full border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default PostCardSecond;
