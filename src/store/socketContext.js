import {createContext, useEffect, useState} from "react"
import { useSelector } from "react-redux";
import io from "socket.io-client"

export const SocketContext = createContext()


export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([])

    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if(userData) {
            const socket = io("https://social-media-server-wbur.onrender.com");

            setSocket(socket)

            return () => socket.close()
        }else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[])
    return <SocketContext.Provider value={{socket, onlineUser}}>{children}</SocketContext.Provider>
}