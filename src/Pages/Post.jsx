import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import userImage from "../component/Images/user.png"

import api from "../api.js";
import getFileType from "../utils/getFileType.js";
import muteImage from "../component/Images/mute.png";
import volumeImage from "../component/Images/volume.png";
import CommentComponent from "../component/CommentComponent.jsx";


export default function Post() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [comment, setComment] = useState([])
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        await api
          .post(`/api/v1/posts/getPostById`, {
            postId: postId,
          })
          .then((post) => {
            if (post) {
              const postData = post.data.data;
              console.log("owner in post", postData);
              setPost(postData);
            }
          });
      } else navigate("/");
    };    
    fetchData();
    const videoPostFile = post?.postFile;
    getFileType(videoPostFile);

  }, [postId, navigate]);

  useEffect(() =>{
    const fetchComment = async () => {
      await api
       .post(`/api/v1/comments/getComment`, {
          postId: postId,
        })
       .then((comments) => {
          setComment(comments.data.data.comments)
          console.log("comments", comments.data.data.comments);
        });
    };
    fetchComment();

  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted);

  };

  return (
    <div className="py-8 h-screen overflow-auto pt-12">
      <div className="w-full mb-4 flex flex-col lg:flex-row items-center lg:items-start relative rounded-xl p-2 ">
        {isVideo ? (
          <div className="w-[25rem] h-full md:h-[35rem] bg-blue-500 rounded-lg overflow-hidden mb-1 relative">
            <video
              width="100%"
              muted={isMuted}
              loop
              autoPlay
              playsInline // Important for mobile devices
            >
              <source src={post?.postFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              onClick={toggleMute}
              className=" border-2 border-black w-8 h-8 rounded-2xl bg-gray-500 opacity-50 absolute bottom-4 right-4 text-center"
            >
              <img
                src={isMuted ? muteImage : volumeImage}
                alt=""
                className="w-7 invert"
              />
            </div>
          </div>
        ) : (
          <div className="w-[80%]">
            <img
              src={post?.postFile}
              alt={post?.caption}
              className="rounded-xl object-contain"
            />
          </div>
        )}
      <div className=" w-[90%] lg:w-[80%] mt-5 lg:mt-1 lg:ml-4">
      <div className="hidden lg:flex">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
            {
              post ? (
                <img
                  src={post.owner.avatar ? post.owner.avatar : userImage}
                  alt="userProfile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null
            }
          </div>
          <div className="ml-5">
          <Link to={`/profile/${post?.owner}`}>
            <p className="text-[30px] mt-4 text-white font-bold">{post ? post.owner.username : null}</p>
            </Link>
          </div>
          </div>
          <p className="text-base mb-3 text-white ml-3 text-[18px] mt-3 hidden lg:block">
        {post?.caption}
        </p>

            <div className="mt-8 w-full h-9 text-gray-500">
               Comments
            </div>
            <div className="h-[11rem] lg:h-screen overflow-auto">
          {
            comment ? comment.map((comment) => (
            <CommentComponent {...comment}/>
            )) : null
          }
          </div>
      </div>
      </div>
    </div>
  );
}
