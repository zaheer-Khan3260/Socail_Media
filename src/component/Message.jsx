import React, { useEffect, useState } from 'react'
import Input from './Input'
import { Link, useAsyncError } from 'react-router-dom'
import UserTemplate from './UserTemplate'
import useGetConversation from "../Hooks/useGetConversation.js"
import api from '../api.js'
import {useSelector} from 'react-redux'



function Message() {
  const {loading, conversation} = useGetConversation()
  const[recieverUserData, setRecieverUserData] = useState([]);
  const[recieverId, setrecieverId] = useState([])
  const userData = useSelector((state) => state.auth.userData)

  console.log("Conversation", conversation)

  
  
  return (
    <div className='w-full border-2 border-blue-600 flex justify-end'>
    
     {/* for the User That we can chat for mobile*/}
  <div className="h-screen w-full border-2 border-green-800">
    {/* search container */}
    <div className='p-3'>
    <Input
    type = "search"
    placeholder= "Serch Users"
    />
    </div>
    {/* userData container */}
    <div className='w-full p-2'>
      {
        conversation ? conversation.map((conversation) => (
        <Link to= {`/chatDisplay/${conversation._id}`}>
          {conversation.conversationBetween.filter((element) => element._id !== userData._id)
          .map((reciever) => (
            <UserTemplate {...reciever}/>
          ))
          }
        </Link>
        )) : <div>You didn't send message anyone</div>
      }
        

    </div>

  </div>

   {/* chat display */}

{/* <div className='w-[60%] border-2 border-yellow-600'>

</div> */}
</div>
  )
}

export default Message
