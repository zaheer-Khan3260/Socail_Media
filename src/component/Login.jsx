import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice.js'
import {Input} from '../component/index.js'
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import LoadingSpinner from './LoadingSpinner/LoadinSpinner.jsx'
import { useState } from 'react'
import api from "../api.js"

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

   const login = async(data) => {
    setLoading(true)
        setError("")
        try {
               const response = await api.post("/api/v1/users/login", data)
              const userData = response.data.data
               console.log("userdata by login", response.data.data);
          if (userData) {
            dispatch(authLogin({userData: userData.user}))
            setLoading(false)
            navigate('/');     
        }
            
        } catch (error) {
            setError(error.message || "An error occure while logIn the user");
            setLoading(false)
        }
   }

  return (
    <div
    className='flex items-center justify-center w-full h-screen'
    >
      <div className={`mx-auto md:w-full max-w-lg bg-white rounded-xl p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'> 
            Logo
          </span>
          </div>
          <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in to your Account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-primary text-blue-700 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'> {error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input 
                label = "Email "
                placeholder = "Email"
                type="email"
                ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                {...register("email", {
                    required: true
                })}
                />
                <Input
                label = "Password "
                placeholder = "Password"
                type = "password"
                ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"

                {...register("password", {
                    required: true,
                })

                }
                />
                <button
        className={`bg-blue-500 mb-6 hover:bg-blue-700 text-white font-semibold py-3 px-8  rounded-lg focus:outline-none focus:shadow-outline`}
        type="submit"
      >
        Log In
      </button>
            </div>
        </form>
      </div>
      <div
        className={`absolute flex h-screen backdrop-blur-lg top-0 w-full ${
          loading ? "block" : "hidden"
        }`}
      >
        <LoadingSpinner />
      </div>
    </div>
  )
} 

export default Login
