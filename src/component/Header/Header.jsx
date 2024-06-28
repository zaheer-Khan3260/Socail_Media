import React, {useState} from 'react'
import {Container, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import settingImage from "../Images/gear.png"
import notificationImage from "../Images/bell.png"
import messageImage from "../Images/chat-bubble.png"
import menuImage from "../Images/menu.png"
import closeIcon from "../Images/delete.png"
// import { useNavigate } from 'react-router-dom'

function Header() {
  // const authStatus = useSelector((state) => state.auth.status)
  // const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  console.log("userData", userData);
  const [activeNav, setActiveNav] = useState(false)
  const navItems = [
    {
      id:1,
      name: 'Home',
      slug: "/",
    }, 
    {
      id:2,
      name: "Search",
      slug: "/search",
  },
  {
    id:3,
      name: "Discover",
      slug: "/discover", 
  },
  {
    id:4,
      name: "Messages",
      slug: "/messages",      
  },
  {
    id:5,
      name: "Create",
      slug: "/add-post",   
  },
  {
    id:6,
    name: "Profile",
    slug: `/profile/${userData ? userData._id : null}`,   
},
  ]


  return (
    <>
      <Container>
    <header>
    <div className={`border-black border-2 h-10 w-full bg-black text-white relative flex md:justify-center md:hidden md:static ${activeNav ? `blur` : `blur-none`}`}>
        {/* left side navbar */}
      <div className='leftSideNav flex justify-between w-1/2 md:w-full md:justify-center' >
            <div className='w-6 ml-1 mt-1 md:hidden'
             onClick={() => setActiveNav(true)}
            >
             <img
              src={menuImage} alt="" className='pt-1' />
             </div>

          <div className='mt-1 md:pl-48'>
          <Link to='/'>
              Logo
              </Link>         
          </div>
      </div>
          {/* right side navbar */}

       <div className='w-1/2 flex justify-end md:hidden '>
              <div className='w-7 mt-1'>
                <img src={notificationImage} alt="" />
              </div>
              <div className='w-7 mt-1 ml-1 mr-1'>
                <img src={messageImage} alt="" />
              </div>
       </div>
          </div>
             {/* right side navbar */}
          </header>

      {/* slide navbar start */}
      <div className={`navbarcont bg-black text-white p-1 h-screen md:w-44 lg:w-[334px] border-2
      absolute md:fixed top-0 left-0 ${activeNav ? `block` : `hidden`} md:block`}>
        <div className='w-full flex justify-between h-14 md:hidden'>
          <div className='mt-3 ml-8'>       
            Logo
          </div>
            <div className=' mr-1 mt-1 w-6 text-center'
            onClick={() => setActiveNav(false)}
            >
             <img src={closeIcon} alt="" />
            </div>
        </div>
        <div className=' w-full h-[33.9rem]'>
       
        {navItems.map((item, index) => 
             (
              <Link to={item.slug}>
                <div key={index}>
              <input type="radio" id={item.id} name="tab"
               className=' border-l-2 border-t-2 border-b-2 border-blue-800 rounded-l-2xl'
              />        
            <label htmlFor={item.id}>{item.name}</label>
            </div>
              </Link>
            )
            )}
            
        </div>
            
        <div className=' w-full absolute bottom-0 h-28 '>
          
             <div className=' pl-2 mx-1 mt-5 pt-1 mb-1 h-8 flex hover:border-2 hover:border-gray-700 hover:rounded-xl '>
                <div className='w-5 h-5 rounded-md mr-1'>
                <img src={settingImage} alt="" />
                </div>
                <div className='mt-[-3px]'>
                Setting
                </div>
             </div>
             <div className='pl-2 pt-1 h-8 mx-1 flex hover:border-2 hover:border-gray-700 hover:rounded-xl'  >
               <LogoutBtn/>
             </div>
        </div>  
      </div> 
      {/* slide navbar end */}
  </Container>
   </>
  )
}

export default Header