import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Post() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
         

    useEffect(() => {
        const fetchData = async() => {
        if (postId) {
           await axios.get(`/api/v1/c/`, {
            params : {postId}
           }).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }
    fetchData();
    }, [postId, navigate]);

    const deletePost = async() => {
        await axios.delete(`/api/v1/posts/c/${post?._id}`).then((status) => { 
            return true 
        }).catch((err) => {
            console.log(err)
        })
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post?.postFile}
                        alt={post?.caption}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}