import { useEffect, useState } from 'react'
import api from '../api'
import { useSocketContext } from '../component/context/SocketContext'
import { useSelector } from 'react-redux'

function useListenMessages() {
  const {socket} = useSocketContext()
  const recieverId = useSelector(state => state.conversation.conversationData?._id)
  const [messages, setMessages] = useState()

  useEffect(() => {
    
    const fetchMessages = async() => {
       const response =  await api.post("/api/v1/message/getMessage", {userToChat: recieverId})
      const messages =  response.data
        if(messages.data) {
            setMessages(messages.data)
        }
    }
    if(recieverId) fetchMessages();
  }, [socket])
    
useEffect(() => {
    socket?.on("newMessage",(newMessage) => {
        setMessages([...messages, newMessage])
    })
    return () => socket?.off("newMessage")
    
},[socket, setMessages, messages])

console.log("messages after socket on ", messages)
}

export default useListenMessages
