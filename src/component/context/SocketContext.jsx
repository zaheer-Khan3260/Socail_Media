import {createContext, useContext, useEffect, useState} from "react"
import { useSelector } from "react-redux";
import io from "socket.io-client"

export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])
    const userStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        let socket;
        if(userData) {
            socket = io("http://localhost:5000", {
                query: {
                    userId: userData._id
                }
            });

            setSocket(socket)
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        }else{
            if(socket){
                socket.disconnect();
                setSocket(null)
            }
        }
    },[userStatus, userData])
    return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
    {children}
    </SocketContext.Provider>
    )
}