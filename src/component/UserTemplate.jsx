import React from 'react'
import userImage from "./Images/user.png"

function UserTemplate( {
    avatar,
    fullname = "Users",
    activeStatus,
    className,
})
{
  return (
    <div className={`w-full h-12 rounded-2xl border-2 border-gray-600 flex ${className} mb-3 `}>
      <div className=' w-11 h-11 bg-white border-2 border-gray-500 rounded-full ml-2 text-center object-fill'>
        <img src={avatar ? avatar : userImage} alt="" className=' object-fill rounded-full w-full h-full' />
      </div>
      <div className='mt-1 ml-2 font-semibold text-[22px]'>
        {fullname}
      </div>
    </div>
  )
}

export default UserTemplate
