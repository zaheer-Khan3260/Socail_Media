import React, { useEffect, useState } from 'react'
import Input from './Input'
import { Link} from 'react-router-dom'
import UserTemplate from './UserTemplate.jsx'
import useGetConversation from "../Hooks/useGetConversation.js"
import {useSelector} from 'react-redux'
import backImage from "./Images/left.png"


function Message() {
  const {loading, conversation} = useGetConversation()
  const userData = useSelector((state) => state.auth.userData)

  console.log("Conversation", conversation)

  
  
  return (
    <div className='w-full md:w-[16rem] lg:w-[18rem] xl:w-[20rem] h-screen bg-[#0f171f]'>
    
     {/* for the User That we can chat for mobile*/}
  <div className="h-screen w-full sticky top-0">
    {/* search container */}
    <div className='py-3 pr-3 flex'>
    <Link to= {"/"}>
    <button className='w-10 invert'>
          <img src={backImage} alt="" />
        </button>
    </Link>
    <Input
    type = "search"
    placeholder= "Search Users"
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
