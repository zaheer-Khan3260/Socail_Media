import React from 'react'
import { Link } from 'react-router-dom'
import homeImage from "../Images/home.png"
import userImage from "../Images/user.png"
import searchImage from "../Images/search.png"
import createImage from "../Images/add.png"
import { useSelector } from 'react-redux'



const Footer = () => {
    const userData = useSelector(state => state.auth.userData);

  return (
    <div className=' md:hidden w-full h-12 px-3 bg-gray-800 text-white sticky bottom-0 flex justify-between items-center '>
        <Link to='/'>
        <div className=' w-9 invert'>
            <img src={homeImage} alt="" className='w-7'/>
        </div>
        </Link>
        <Link to='/'>
        <div className=' w-9 invert'>
            <img src={searchImage} alt="" className='w-7'/>
        </div>
        </Link>
        <Link to='/add-post'>
        <div className=' w-9 invert'>
            <img src={createImage} alt="" className='w-7'/>
        </div>
        </Link>
        <Link to={`/profile/${userData?._id}`}>
        <div className=' w-9 invert'>
            <img src={userImage} alt="" className='w-7'/>
        </div>
        </Link>
    </div>
  )
};

export default Footer;
