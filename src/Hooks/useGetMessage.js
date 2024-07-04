import { useEffect, useState } from 'react'
import api from '../api';

function useGetMessage( chatToId ) {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async() => {
            setLoading(true)
           const response =  await api.post("/api/v1/message/getMessage", {
                params: {
                    userToChat: chatToId
                }
            })
          const messages =  response.data
            if(messages.data) {
                setMessages(messages.data)
                setLoading(false)
            }
        }
        fetchMessages();
     return {loading ,messages}
    }, [])

}

export default useGetMessage
