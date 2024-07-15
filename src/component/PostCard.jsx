import React, { useEffect, useState,useRef } from "react";
import userImage from "./Images/user.png";
import commentImage from "./Images/comment.png";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import menuImage from "./Images/more.png"
import muteImage from "./Images/mute.png"
import volumeImage from "./Images/volume.png"
import Input from "./Input.jsx";
import getFileType from "../utils/getFileType.js";
import LoadingSpinner from "./LoadingSpinner/LoadinSpinner.jsx";
import { BsSend } from "react-icons/bs";


function PostCard({
  _id,
  owner,
  postFile,
  isLiked,
  likeCount,
  caption,
}) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [comment, setComment] = useState("");
  const [isMuted, setIsMuted] = useState(true)
  const [deleteMessage, setDeleteMessage] = useState(false)
  const [showPost, setShowPost] = useState(true)
  const videoRef = useRef(null);
  const [newIsLiked, setNewIsLiked] = useState(isLiked);
  const [newLikeCount, setNewLikeCount] = useState(likeCount)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const containerRef = useRef(null);
  const currentUserData = useSelector((state) => state.auth.userData)

  const commentCreation = async() => {
    try {
      if(comment){
        await api.post("/api/v1/comments/createComment", {
          postId: _id,
          content: comment,
        });
        setComment("")
        navigate(`/post/${_id}`)
      }
    } catch (error) {
      console.log("An error occur while creating a comment", error);
    }
  }

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleLikeCount = () => {
    setNewIsLiked(!newIsLiked);
    setNewLikeCount(prevCount => prevCount + (newIsLiked ? -1 : 1));
  }

  const deletePost = async() => {
    await api.post("/api/v1/posts/deletePost", {
        postId: _id 
    }).then((res) => {
      if(res.status === 200){
        setShowPost(false)
        setDeleteMessage("Post deleted successfully")
        setTimeout(() => {
          setDeleteMessage(false)
        }, 2000)
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
    
    const fileType = getFileType(postFile)
    if(fileType === "video") setIsVideo(true);
    fetchData();
    setIsMounted(true);
  }, [owner]);

  const handleLike = async () => {
    try {
      const response = await api.post("/api/v1/like/toggle/v/postLike", {
        postId: _id,
      });
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
      showPost ? (
    <div className="mb-8 w-full h-full bg-[#0D1117] text-white rounded-lg shadow-lg md:w-[468px] pb-4 relative">
      <div className="flex flex-col p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 text-white">
          <div className="flex">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
            {
              userData ? (
                <img
                  src={userData.avatar ? userData.avatar : userImage}
                  alt="userProfile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null
            }
          </div>
          <div className="ml-3">
          <Link to={`/profile/${owner}`}>
            <p className="text-lg font-bold">{userData ? userData.username : null}</p>
            </Link>
            {/* <p className="text-sm text-gray-500">8:00PM, 05-07-2024</p> */}
          </div>
          </div>
          <div className=" relative cursor-pointer invert" >
          <div onClick={toggleMenu}>
          <img src={menuImage} alt="" className=" h-8" />
          </div>
          <div className={`w-24 h-28 rounded-2xl bg-slate-500 z-50 absolute right-0 top-12 text-white text-center opacity-75 ${menuIsOpen? "block" : "hidden"}`}>
            <div 
            className={` text-red-800 font-bold text-[20px] border-b border-gray-600 cursor-pointer ${currentUserData?._id === owner ? "block" : "hidden"}`}
            onClick={deletePost}
            >
              Delete
              </div>
            <div 
            className={` text-red-800 font-bold text-[20px] border-b border-gray-600 cursor-pointer ${currentUserData?._id === owner ? "block" : "hidden"}`}
            onClick={() => navigate(`/edit-post/${_id}`)}
            >
              Edit
              </div>
          </div>
        </div>
        </div>

        {/* Caption */}
        <p className="text-base mb-3">
        {caption}
        </p>

        {isVideo ? (
        <div 
        ref={containerRef}
        className="w-full h-full md:h-[35rem] bg-blue-500 rounded-lg overflow-hidden mb-1 relative">
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
        className=" border-2 border-black w-8 h-8 rounded-2xl bg-gray-500 opacity-50 absolute bottom-4 right-4 text-center">
          <img src={isMuted ? muteImage : volumeImage} alt="" className="w-7 invert"/>
        </div>
          </div>
      ) : (
        <Link to={`/post/${_id}`}>
        <div className="w-full max-h-[30rem] bg-blue-500 rounded-lg overflow-hidden mb-1 object-fill">
          <img
            src={postFile}
            alt="Main content"
            className="w-full"
          />
        </div>
        </Link>
      )}

        {/* Like and comment container */}
        <div className="flex items-center mt-3 space-x-4 mb-2 cursor-pointer">
          <div 
          className={`flex items-center space-x-1 ${newIsLiked ? "liked" : ""} action-button`}
          onClick={() => {
          handleLike()
          toggleLikeCount();
          }}
          >
          {newIsLiked ? "❤️" : "🤍"}
            <p className="text-base">{newLikeCount}</p>
          </div>
          <div className="flex items-center space-x-1">
            <img
              src={commentImage}
              alt="Comment"
              className="w-6 h-6 transition-transform duration-300 hover:scale-105 invert"
            />
            <p className="text-base">0</p>
          </div>
        </div>
      </div>
      <div className=" w-full h-10 flex items-center">
        <div className="w-9 h-9 border border-gray-500 rounded-full flex justify-center text-center ml-1 object-contain">
          <img
            src={currentUserData ? currentUserData.avatar : userImage}
            alt=""
            className=" rounded-full w-9 h-9"
          />
        </div>
        <div className="ml-1 relative">
          <Input
          placeholder = "Comment.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
          <button type='submit'
          onClick={commentCreation}
          className='absolute top-4 right-0 flex items-center pr-3 invert'>
					 <BsSend />
				</button>
        </div>
      </div>

      <div className={`absolute flex h-full backdrop-blur-lg  top-0 w-full ${showPost ? "hidden" : "block"}`}>
                <LoadingSpinner/>
            </div>
    </div>
      ) : 
      <div className={`w-[7rem] h-10 flex p-2 rounded-2xl opacity-70 bg-red-700 text-white
       lg:right-[-14rem] duration-300 transition-all ${deleteMessage ? "block" : "hidden"}`}>
      Post deleted
    </div>
  );
}

export default PostCard;
