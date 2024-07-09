import React, { useEffect, useState, useRef} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import backButton from "../component/Images/left.png"
import api from '../api.js'
import MessageSkeleton from '../component/MessageSkeleton.jsx'
import MessageInputNew from '../component/MessageInputNew.jsx'
import { conversationEnd } from '../store/conversationSlice.js'
import { endMessages } from '../store/messageSlice.js'
import { useSocketContext } from '../component/context/SocketContext.jsx'

function Chatdisplay() {
  const dispatch = useDispatch()
  const [conversation, setConversation] = useState([])
  const {socket} = useSocketContext()
  const [conversationUserData, setConversationUserData] = useState([])
  const [recieverId, setRecieverId] = useState()
  const { conversationId } = useParams()
  const messageStatus = useSelector((state) => state.message.status)
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
    dispatch(endMessages())
    }
    }
    fetchConversation();
  }, [conversationId, messageStatus])

  useEffect(() => {
    if (!socket) {
      return;
    }
      const messageHandler = (newMessage) => {
          setConversation((prevConversation) =>
             [...prevConversation, newMessage])
      }
      socket.on("newMessage", messageHandler);
      return () => {
        socket?.off("newMessage")
      }
      
  },[socket, setConversation, conversation])

  useEffect(() => {
    if(conversationUserData.length > 0){
      const reciever = conversationUserData.find(user => user._id !== currentUserData?._id)
      if(reciever) {
        setRecieverId(reciever)
      }
    }
  }, [currentUserData, conversationUserData]);

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [conversation]);


  return (
    <div className='lg:min-w-[400px] md:min-w-[300px] xl:min-w-[775px] flex flex-col h-screen overflow-auto'>
			{conversationUserData ? (
				<>
					{/* Header */}
					<div className='bg-slate-500 py-2 mb-2 flex cursor-pointer'>
            <Link to="/messages">
        <button className='w-10' onClick={() => dispatch(conversationEnd())}>
          <img src={backButton} alt="" />
        </button>
        </Link>
          { conversationUserData
          .filter(user => user?._id !== currentUserData?._id)
              .map((reciever) => (
               <div className='flex justify-start'>
                <div className=' w-11 h-11 bg-white border-2 border-gray-500 rounded-full ml-2 text-center object-fill'>
        <img src={reciever.avatar} alt="" className=' object-fill rounded-full w-full h-full' />
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
              conversation.map((data) => (
                <div key={data._id} ref={lastMessageRef}>
                  <MessageSkeleton {...data}/>
                </div>
              )) : null
            }
          </div>

          {/* input field */}
          <MessageInputNew {...recieverId}/>
				</>
			) : null
    }
		</div>
  )
}

export default Chatdisplay


