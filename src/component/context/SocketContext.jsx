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
        let newSocket;
        if(userData) {
            newSocket = io("http://localhost:5000", {
                query: {
                    userId: userData._id
                }
            });

            setSocket(newSocket)
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => newSocket.close()
        }else{
            if(newSocket){
                
                newSocket.disconnect();
                setSocket(null)
            }
        }
    },[userStatus])
    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}