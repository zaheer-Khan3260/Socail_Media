import React, { useEffect, useState, useRef} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import backButton from "../component/Images/left.png"

import api from '../api'
import MessageSkeleton from '../component/MessageSkeleton'

function Chatdisplay() {
  const [conversation, setConversation] = useState([])
  const [recieverAvatar, setRecieverAvatar] = useState();
  const [conversationUserData, setConversationUserData] = useState([])
  const { conversationId } = useParams()
  const currentUserData = useSelector((state) => state.auth.userData);
  const lastMessageRef = useRef();

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

    fetchConversation();
  }, [])

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [conversation]);


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
          {
              conversationUserData.filter((element) => element._id !== currentUserData._id)
              .map((reciever) => (
               <div className='flex justify-start'>
                <div className=' w-11 h-11 bg-white border-2 border-gray-500 rounded-full ml-2 text-center object-fill'>
        <img src={reciever.avatar} alt="" className=' object-fill rounded-full w-full h-full' />
        {setRecieverAvatar(reciever.avatar)}
      </div>
      <span className='text-gray-900 font-bold mt-1 ml-2 text-[25px]'>{reciever.fullname}</span>
               </div>
              ))
            }
					</div>
          {/* message skeleton component */}
          <div className='px-4 flex-1 overflow-auto'>
            {
              conversation ? 
              conversation.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                  <MessageSkeleton {...message}/>
                </div>
              )) : null
            }

          </div>
					{/* <Messages />
					<MessageInput /> */}
				</>
			) : null
    }
		</div>
  )
}

export default Chatdisplay
