import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button,Select } from "./index.js";
import { useNavigate } from "react-router-dom";
import Input from "./Input.jsx"
import api from "../api.js"

export default function PostForm({ post }) {
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
                        navigate(`/post/${postData?.data?._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }

            }
        } else {
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
                        navigate(`/post/${postData.data._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
           
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="md:flex flex-wrap">
            <div className="w-2/3 px-2">
            <Input
            type="text"
            label="Caption :"
            placeholder="Caption"
            className="mb-4"
            {...register("caption", { required: true })}
            />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("postFile", { required: !post })}
                />
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
        </form>
    );
}