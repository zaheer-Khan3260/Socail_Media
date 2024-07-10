import React, { useState, useEffect} from 'react'
import {Container, EditPost} from '../component/index'
import { useNavigate, useParams } from 'react-router-dom'


function EditPostPages() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

  return post ? (
    <div>
       <Container>
        <EditPost post/>
       </Container>
    </div>
  ) : null
}

export default EditPostPages;
