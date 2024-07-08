import React, { useEffect, useState } from 'react'
import Input from './Input'
import { Link} from 'react-router-dom'
import UserTemplate from './UserTemplate.jsx'
import useGetConversation from "../Hooks/useGetConversation.js"
import {useSelector} from 'react-redux'


function Message() {
  const {loading, conversation} = useGetConversation()
  const userData = useSelector((state) => state.auth.userData)

  console.log("Conversation", conversation)

  
  
  return (
    <div className='w-full md:w-[16rem] lg:w-[18rem] xl:w-[20rem] h-screen'>
    
     {/* for the User That we can chat for mobile*/}
  <div className="h-screen w-full border-2 border-green-800 sticky top-0">
    {/* search container */}
    <div className='p-3'>
    <Input
    type = "search"
    placeholder= "Serch Users"
    />
    </div>
    {/* userData container */}
    <div className='w-full p-2 overflow-y-auto'>
      {
        conversation ? conversation.map((conversation) => (
        <Link to= {`${conversation?._id}`}>
          {conversation.conversationBetween.filter((element) => element._id !== userData?._id)
          .map((reciever) => (
            <UserTemplate {...reciever}/>
          ))
          }
        </Link>
        )) : <div>You didn't send message anyone</div>
      }
    </div>
  </div>
</div>
  )
}

export default Message
