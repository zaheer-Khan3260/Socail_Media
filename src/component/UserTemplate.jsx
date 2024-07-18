import React from 'react'
import userImage from "./Images/user.png"
import { useDispatch } from 'react-redux'
import { useSocketContext } from './context/SocketContext'
import { conversationSend } from '../store/conversationSlice'

function UserTemplate( {
    _id,
    avatar,
    fullname = "Users",
    username,
    className,
})
{
  const reciverData = {
    _id,
    fullname,
    avatar,
    username,
  }
  const dispatch = useDispatch()
  const {onlineUsers} = useSocketContext();
  let isOnline;
  if(_id){
   isOnline = onlineUsers.includes(_id);
  }

  return (
    <div className={`w-full h-12 text-white flex ${className} mb-3 `} onClick={() => dispatch(conversationSend(reciverData))}>
      <div className=' relative w-11 h-11 bg-white border-2 border-gray-500 rounded-full ml-2 text-center object-fill'>
        <div 
        className={`absolute w-3 h-3 rounded-full bg-green-500 border-2 border-green-500 ${isOnline ? 'block' : 'hidden'}`}
        ></div>
        <img src={avatar ? avatar : userImage} alt="" className=' object-fill rounded-full w-full h-full' />
      </div>
      <div>
      <div className='mt-1 ml-2 font-semibold text-[22px]'>
        {username}
      </div>
      </div>
    </div>
  )
}

export default UserTemplate
