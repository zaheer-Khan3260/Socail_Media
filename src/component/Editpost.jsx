import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button,Select } from "./index.js";
import { useNavigate } from "react-router-dom";
import Input from "./Input.jsx"
import api from "../api.js"
import LoadingSpinner from "./LoadinSpinner.jsx";
import plusImage from "./Images/add.png"

export default function PostForm({ post }) {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            caption: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const submit = async (data) => {
        if (post) {
            setLoading(true);
            if(data.image[0]) setFile(data.image[0])
            if (file) {
                await api.delete(
                    "/api/v1/posts/deletevideo",{
                    params: {
                        postId: post?._id
                    }
                })
                const formData = new FormData;
                formData.append("postFile", data.postFile[0])
                formData.append("caption", data.caption)
                formData.append("isPublished", data.isPublished)
                try {
                    const response = await api.post(
                        "http://localhost:5000/api/v1/posts/upload-video",
                        formData,
                    )
                    const postData = response?.data
                    if(postData) {
                        setLoading(false)
                        navigate(`/post/${postData?.data?._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }

            }
        } else {
            setLoading(true)
            if(data.postFile[0]) setFile(data.postFile[0])
            if (file) {
                const formData = new FormData;
                formData.append("postFile", file)
                formData.append("caption", data.caption)
                formData.append("isPublished", data.isPublished)
                try {
                    const response = await api.post(
                        "/api/v1/posts/",
                        formData
                    )
                    const postData = response?.data
                    if(postData) {
                        setLoading(false)
                        navigate(`/post/${postData.data._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
           
        }
    };


    return (

            <form onSubmit={handleSubmit(submit)} className="md:flex flex-wrap h-screen text-white w-full relative">
            <div className="w-full px-2">
            <Input
            type="text"
            label="Caption"
            placeholder="Caption"
            ClassName="mb-4"
            {...register("caption", { required: true })}
            />
            </div>
            <div className="w-full px-2">
            <div className="relative w-full h-44 mb-5">
              <div className="top-0 left-0">
            <Input
              type="file"
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full md:w-80 h-36 py-8 absolute z-50 opacity-0"
              {...register("postFile", {
                required: !post,
              })}
            />
            </div>
            <div 
              className="w-full md:w-80 h-36 border-2 rounded-3xl border-dashed
               border-gray-400 py-5 flex flex-col justify-center items-center absolute top-7 z-0"
              
              > 
              <div className="w-12 opacity-45 invert">
                <img src={plusImage} alt="" />
              </div>
              <div className=" font-semibold opacity-75">Add Post</div>
              <div className="text-[12px]">
                or <span className="text-blue-700">drag file</span> from your system
              </div>
              </div>
            </div>
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.postFile}
                            alt={post.caption}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("isPublished", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
            <div className={`absolute top-0 w-full ${loading ? "block" : "hidden"}`}>
                <LoadingSpinner/>
            </div>
        </form>
        
    );
}