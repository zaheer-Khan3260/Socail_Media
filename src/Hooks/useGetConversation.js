import React, { useEffect, useState } from 'react'
import api from '../api';

export default function useGetConversation() {
 
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    

    useEffect(() => {
        const fetchConversation = async() => {
            setLoading(true)
            const response = await api.get("/api/v1/message/getConversation")
            const conversationArray = response.data.data
            console.log("conversation array in hook", conversationArray);
            if(conversationArray){
                setConversation(conversationArray)
                setLoading(false)
            }
        }

        fetchConversation();
    
    },[])

    return {loading , conversation}
}


