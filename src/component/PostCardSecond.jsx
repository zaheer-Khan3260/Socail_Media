import React, { useEffect, useState,useRef } from "react";
import userImage from "./Images/user.png";
import afterLikeButton from "./Images/heartcolored.png";
import commentImage from "./Images/comment.png";
import shareImage from "./Images/send.png";
import likeButton from "./Images/heart.png";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useSelector } from "react-redux";

function PostCardSecond({
  _id,
  owner,
  postFile,
  isLiked,
  likeCount,
  comment,
  caption,
}) {
  const [userData, setUserData] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true)
  const [currentLikeStatus, setCurrentLikeStatus] = useState(isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const videoRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const containerRef = useRef(null);
  const currentUserData = useSelector((state) => state.auth.userData)



  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const deletePost = async() => {
    await api.post("/api/v1/posts/deletePost", {
        postId: _id 
    }).then((res) => {
      if(res.status === 200){
        return true
      }
    }).catch((err) => {
      console.log(err ? err.message : "An error occur while delete the post")
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.post("/api/v1/users/getUserById", {
        userId: owner,
      });
      const userData = response.data;
      if (userData) {
        setUserData(userData.data);
      }
    };
    function getFileType(postFile) {
      const extension = postFile.split('.').pop().toLowerCase();
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];

  if (imageExtensions.includes(extension)) {
    setIsVideo(false);
  } else if (videoExtensions.includes(extension)) {
    setIsVideo(true);
  }
    }
    getFileType(postFile);
    fetchData();
    setIsMounted(true);
  }, [owner]);

  const handleLike = async () => {
    try {
      const response = await api.post("/api/v1/like/toggle/v/postLike", {
        postId: _id,
      });

      if (response.data.data.success) {
        setCurrentLikeStatus(!currentLikeStatus);
        setCurrentLikeCount((prevCount) =>
          currentLikeStatus ? prevCount - 1 : prevCount + 1
        );
      }
    } catch (err) {
      console.error("An error occurred while liking the post:", err.message);
    }
  };

  useEffect(() => {
    if (!isVideo || !isMounted || !videoRef.current) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the video is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.currentTime = 0; // Reset to beginning
          videoRef.current.play();
        } else if(videoRef.current) {
          videoRef.current.pause();
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVideo, isMounted]);

  return (
    <div className="w-60 h-full border-2 border-gray-500 bg-slate-900 text-white rounded-xl mt-2 mx-auto md:w-[468px]">
      {/* profile image and username cont */}

      <div className="flex justify-between">
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
        <div className="w-16 h-8 rounded-2xl bg-slate-600 relative cursor-pointer" >
          <div onClick={toggleMenu}>
          Menu
          </div>
          <div className={`w-24 h-28 rounded-2xl bg-slate-500 z-50 absolute right-0 top-12 text-white text-center ${menuIsOpen? "block" : "hidden"}`}>
            <div 
            className={` text-red-800 font-bold text-[20px] border-b border-gray-600 cursor-pointer ${currentUserData._id === owner ? "block" : "hidden"}`}
            onClick={deletePost}
            >
              Delete
              </div>
          </div>
        </div>

      </div>
      <div className="w-full pt-1 overflow-hidden pl-1 font-light text-sm">
        <p className=" overflow-hidden">{caption}</p>
      </div>
      {/* content cont */}
      {isVideo ? (
          <div className="bg-[#272727] w-full mt-1 flex items-center justify-center media-container relative" ref={containerRef}>
        <Link to={`/post/${_id}`}>
          <video 
          ref={videoRef}
          width="100%" 
          muted= {isMuted}
          loop 
          playsInline // Important for mobile devices
        >
          <source src={postFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
       
        </Link>
        <div
        onClick={toggleMute}
        className=" border-2 border-black w-16 h-10 rounded-2xl bg-gray-500 absolute bottom-4 right-4 text-center">
          muted
        </div>
          </div>
      ) : (
        <Link to={`/post/${_id}`}>
          <div className="bg-[#272727] w-full mt-1 flex items-center justify-center">
            <img
              src={postFile}
              alt={caption}
              className="bg-[#272727] h-full object-cover"
            />
          </div>
        </Link>
      )}

      {/* like,comment and share cont */}
      <div className=" h-14">
        <div className="flex mt-2 ml-1">
          <div>
            <button
              className={`action-button ${isLiked ? "liked" : ""} w-6 h-6 mr-2`}
              onClick={handleLike}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
            <p className="ml-2 mt-[-2px]">{currentLikeCount}</p>
          </div>
          <img
            src={commentImage}
            alt=""
            className="w-6 h-6 mr-2 invert cursor-pointer"
          />
          <img
            src={shareImage}
            alt=""
            className="w-5 h-5 mt-[3px] invert cursor-pointer"
          />
        </div>
      </div>
      <div className=" w-full h-10 flex items-center">
        <div className="w-7 h-7 border border-gray-500 rounded-full flex justify-center text-center ml-1">
          <img
            src={userImage}
            alt=""
            className=" rounded-full w-6 h-6 object-cover"
          />
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
