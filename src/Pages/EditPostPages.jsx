import React, { useState, useEffect} from 'react'
import {Container, EditPost} from '../component/index'
import api from '../api.js'
import { useNavigate, useParams } from 'react-router-dom'


function EditPostPages() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
      const fetchData = async() => {
      if (slug) {
         await api.post(`/api/v1/posts/getPostById`, {
          postId: slug
         }).then((post) => {
             if (post) {
                 const postData = post.data.data
                  setPost(postData);}
                  else navigate("/");
          });
      } else navigate("/");
  }
  fetchData();
  }, [navigate]);

  console.log("post", post);
  return post ? (
    <div>
        <EditPost post = {post}/>
    </div>
  ) : null
}

export default EditPostPages;
