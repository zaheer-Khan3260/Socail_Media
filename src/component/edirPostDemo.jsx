import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "./index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const submit = async (data) => {
        if (post) {
            data.image[0] ? setFile(data.image[0]) : null
            if (file) {
                await axios.delete(
                    "/api/v1/posts/deletevideo",{
                    params: {
                        postId: post?._id
                    }
                })
                const formData = new FormData;
                formData.append("file", file)
                try {
                    const response = await axios.post(
                        "/api/v1/posts/upload-video",
                        formData,
                        ...data
                    )
                    if(response) {
                        navigate(`/post/${response._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }

            }
        } else {
            data.image[0]? setFile(data.image[0]) : null;
            if (file) {
                const formData = new FormData;
                formData.append("file", file)
                try {
                    const response = await axios.post(
                        "/api/v1/posts/upload-video",
                        formData,
                        ...data
                    )
                    if(response) {
                        navigate(`/post/${response._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
           
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
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
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}