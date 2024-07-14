import React, { useState } from 'react';
import { Container, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import settingImage from "../Images/gear.png";
import notificationImage from "../Images/bell.png";
import messageImage from "../Images/chat-bubble.png";
import homeImage from "../Images/home.png";
import userImage from "../Images/user.png";
import searchImage from "../Images/search.png";
import createImage from "../Images/add.png";
// import { useNavigate } from 'react-router-dom';

function Header() {
  // const authStatus = useSelector((state) => state.auth.status)
  // const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData);
  console.log("userData", userData);
  const [activeNav, setActiveNav] = useState(false);

  const navItems = [
    { id: 1, name: 'Home', slug: "/", image: homeImage },
    { id: 2, name: "Search", slug: "/search", image: searchImage },
    { id: 3, name: "Discover", slug: "/discover", image: notificationImage },
    { id: 4, name: "Messages", slug: "/messages", image: messageImage },
    { id: 5, name: "Create", slug: "/add-post", image: createImage },
    { id: 6, name: "Profile", slug: `/profile/${userData ? userData._id : null}`, image: userImage },
  ];

  return (
    <div className='bg-[#0f171f]'>
      <header className='h-10 w-full bg-black text-white flex justify-center md:hidden'>
        {/* mobile left side navbar */}
        <div className='flex justify-between w-1/2 md:w-full md:justify-center'>
          <div className='mt-1 md:pl-48'>
            <Link to='/'>
              Logo
            </Link>
          </div>
        </div>
        {/* right side navbar */}
        <div className='w-1/2 flex justify-end md:hidden'>
          <div className='w-7 mt-1 invert'>
            <img src={notificationImage} alt="Notifications" />
          </div>
          <Link to='/messages'>
            <div className='w-7 mt-1 ml-1 mr-1'>
              <img src={messageImage} alt="Messages" />
            </div>
          </Link>
        </div>
      </header>

      {/* tab or laptop slide navbar start */}
      <div className={`bg-[#123654] text-white p-1 h-screen w-48 fixed hidden md:flex flex-col`}>
        <div className='w-full h-[100%]'>
          {navItems.map((item) => (
            <Link to={item.slug} key={item.id}>
              <div className='flex my-3 hover:scale-110 duration-300'>
                {/* <input type="radio" id={item.id} name="tab"
                  className='border-l-2 border-t-2 border-b-2 border-blue-800 rounded-l-2xl' /> */}
                {item.image && (
                  <div className='w-6 mx-2 mt-1'>
                    <img src={item.image} alt={item.name} className='invert' />
                  </div>
                )}
                <label htmlFor={item.id} className='text-white'>{item.name}</label>
              </div>
            </Link>
          ))}
        </div>

        <div className='w-full h-[20%] flex flex-col justify-end'>
          <div className='pl-2 mx-1 mt-5 pt-1 mb-1 h-8  flex hover:border-2 hover:border-gray-700 hover:rounded-xl'>
            <div className='w-5 h-5 rounded-md mr-1'>
              <img src={settingImage} alt="Settings" />
            </div>
            <div className='mt-[-3px]'>
              Setting
            </div>
          </div>
          <div className='pl-2 pt-1 h-8 mx-1 mb-10 flex hover:border-2 hover:border-gray-700 hover:rounded-xl'>
            <LogoutBtn />
          </div>
        </div>
      </div>
      {/* slide navbar end */}
      </div>
  );
}

export default Header;
