import React from 'react'
import {useDispatch} from 'react-redux'
import logoutImage from '../Images/log-out.png'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import api from '../../api.js'

function LogoutBtn() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async() => {
        await api.post("/api/v1/users/logout").then(() => {
            dispatch(logout())
            navigate('/login')
        }).catch((err) => {
          console.log(err)
        })
    }
  return (
    <>
    <div className='w-5 h-5 rounded-md mr-1'
    onClick={logoutHandler}
    >
       <img src={logoutImage} alt="" />
       </div>
       <div className='mt-[-3px]'>
       Logout
       </div>
    
    </>
  )
}

export default LogoutBtn