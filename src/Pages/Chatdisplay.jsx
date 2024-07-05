import React, { useEffect, useState, useRef} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import backButton from "../component/Images/left.png"
import { BsSend } from "react-icons/bs";


import api from '../api'
import MessageSkeleton from '../component/MessageSkeleton'

function Chatdisplay() {
  const [conversation, setConversation] = useState([])
  const [conversationUserData, setConversationUserData] = useState([])
  const [message, setMessage] = useState()
  const [recieverId, setRecieverId] = useState()
  const { conversationId } = useParams()
  const currentUserData = useSelector((state) => state.auth.userData);
  const lastMessageRef = useRef();
  const reciever = conversationUserData.filter((element) => element._id !== currentUserData._id)

  
  const handleSubmit = async () => {
    try {
      await api.post("/api/v1/message/sendMessage", {
        message,
        recieverId
      }).then((res) => {
        if(res.status){
          return true
        }
      })
    } catch (error) {
      console.log("error in sending message: ",error )
    }
	};

  useEffect(() => {
    const fetchConversation = async() => {
    const response = await api.post("/api/v1/message/getConversationById", {conversationId: conversationId})
    if(response) {
      const usersData = response.data.data.conversationBetween
    const conversationData = response.data.data.messages
    setConversationUserData(usersData)
    setConversation(conversationData);

    }
    }
    const mapRecieverId = () => {
      reciever.map((data) => setRecieverId(data._id))
    }
    fetchConversation();
    mapRecieverId();
  }, [conversationId])

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [conversation]);
console.log("messages in chatdisplay", conversation)

  return (
    <div className='md:min-w-[450px] flex flex-col'>
			{conversationUserData ? (
				<>
					{/* Header */}
					<div className='bg-slate-500 py-2 mb-2 flex'>
            <Link to="/messages">
        <button className='w-10'>
          <img src={backButton} alt="" />
        </button>
        </Link>
          { reciever ?
              reciever.map((reciever) => (
               <div className='flex justify-start'>
                <div className=' w-11 h-11 bg-white border-2 border-gray-500 rounded-full ml-2 text-center object-fill'>
        <img src={reciever.avatar} alt="" className=' object-fill rounded-full w-full h-full' />
      </div>
      <span className='text-gray-900 font-bold mt-1 ml-2 text-[25px]'>{reciever.fullname}</span>
               </div>
              )) : null
            }
					</div>
          {/* message skeleton component */}
          <div className='px-4 flex-1 overflow-auto'>
            {
              conversation ? 
              conversation.map((data) => (
                <div key={data._id} ref={lastMessageRef}>
                  <MessageSkeleton {...data}/>
                </div>
              )) : null
            }
          </div>

          {/* input field */}
          <form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					<BsSend/>
				</button>
			</div>
		</form>

					{/*
					<MessageInput /> */}
				</>
			) : null
    }
		</div>
  )
}

export default Chatdisplay
