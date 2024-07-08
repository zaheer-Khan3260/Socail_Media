import React from 'react'
import Message from '../component/Message.jsx'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function MessagePagesNew() {
  const conversationStatus = useSelector((state) => state.conversation.status)
  console.log("conversation Status", conversationStatus);
  return (
    <div className='md:text-center w-full md:flex md:justify-end 2xl:justify-center'>
     <div className={` ${conversationStatus ? "hidden md:block lg:block xl:block" : "block"}`}><Message/></div>
     <div className={`lg:min-w-[400px] md:min-w-[300px] xl:min-w-[775px] hidden bg-slate-400 ${conversationStatus ? "hidden" : "md:flex"}`}>
        <NoChatSelected/>
     </div>
     <Outlet/>
    </div>
  )
}

const NoChatSelected = () => {
	const currentUserData = useSelector((state) => state.auth.userData);
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {currentUserData?.fullname} ❄</p>
				<p>Select a chat to start messaging</p>
			</div>
		</div>
	);
};

