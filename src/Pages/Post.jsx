import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import api from "../api.js";
import getFileType from "../utils/getFileType.js";
import muteImage from "../component/Images/mute.png"
import volumeImage from "../component/Images/volume.png"



export default function Post() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true)
    const [isVideo, setIsVideo] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchData = async() => {
        if (postId) {
           await api.post(`/api/v1/posts/getPostById`, {
            postId: postId
           }).then((post) => {
               if (post) {
                   const postData = post.data.data
                    setPost(postData);
                }
            });
        } else navigate("/");
    }
    fetchData();
    const videoPostFile = post?.postFile
    const getFileType = videoPostFile => {
    
     const extension = videoPostFile?.split('.')?.pop()?.toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];
    
    if (imageExtensions.includes(extension)) {
      setIsVideo(false);
    } else if (videoExtensions.includes(extension)) {
      setIsVideo(true);
    }
    }
    getFileType()
    }, [postId, navigate]);
    
    const toggleMute = () => {
        setIsMuted(!isMuted)
      }




    return (
        <div className="py-8 h-screen overflow-auto">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    
        {isVideo ? 
        <div 
        className="w-full h-full md:h-[35rem] bg-blue-500 rounded-lg overflow-hidden mb-1 relative">
          <video 
          width="100%" 
          muted= {isMuted}
          loop 
          autoPlay
          playsInline // Important for mobile devices
        >
          <source src={post?.postFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
        onClick={toggleMute}
        className=" border-2 border-black w-8 h-8 rounded-2xl bg-gray-500 opacity-50 absolute bottom-4 right-4 text-center">
          <img src={isMuted ? muteImage : volumeImage} alt="" className="w-7 invert"/>
        </div>
          </div> : <img
                        src={post?.postFile}
                        alt={post?.caption}
                        className="rounded-xl"
                    /> 
          }

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post?._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-white">{post?.caption}</h1>
                </div>
        </div>
    )
}