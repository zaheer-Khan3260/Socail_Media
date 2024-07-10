import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index.js";
import { useDispatch } from "react-redux";
import serialize from 'serialize-javascript';
import { useForm } from "react-hook-form";
import plusImage from "./Images/add.png"
import api from "../api.js";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);

  const create = async (data) => {
    setError("");
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("fullname", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    
    try {
      const response = await api.post(
        `/api/v1/users/register`,
        formData,
        {
          withCredentials: true, 
        }
      );
      console.log(response.data)
      if (response.data) {
        dispatch(login({userData: response.data}));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "An error occure while creating account");
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className={`md:mx-auto w-[23rem] md:w-full max-w-lg  rounded-xl p-10 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">Logo</span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60 mb-10">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className=" text-blue-600 font-semibold text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit(create)} encType="multipart/form-data">
          <div className="space-y-5">
            <div className=" flex justify-between">
            <Input
              label="Full Name "
              placeholder="Name"
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[90%]"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label=" Username"
              placeholder="Username"
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[90%]"
              {...register("username", {
                required: true,
              })}
            />
            </div>

            <Input
              label="Email "
              placeholder="Email"
              type="email"
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[75%]"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password "
              type="password"
              placeholder="Password"
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[75%]"
              {...register("password", {
                required: true,
              })}
            />
            <div className="relative w-full h-44">
              <div className="top-0 left-0">
            <Input
              type="file"
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full md:w-80 h-36 py-8 absolute z-50 opacity-0"
              {...register("avatar", {
                required: true,
              })}
            />
            </div>
            <div 
              className="w-full md:w-80 h-36 border-2 rounded-3xl border-dashed
               border-gray-400 py-5 flex flex-col justify-center items-center absolute top-7 z-0"
              
              > 
              <div className="w-12 opacity-45">
                <img src={plusImage} alt="" />
              </div>
              <div className=" font-semibold opacity-75">Add Avatar</div>
              <div className="text-[12px]">
                or <span className="text-blue-700">drag file</span> from your system
              </div>
              </div>
            </div>

            <div className=" relative xl:w-[26rem]">
              <input
                type="checkbox"
                name=""
                id=""
                className=" absolute top-[0.38rem] left-1"
              />
              
              <h2 className=" inline-block ml-6 font-semibold">
                Creating an account means you're okay with our{" "}
                <a href="#" className="text-blue-600">
                  Terms of Service, Privacy Policy,
                </a>
                and default{" "}
                <a href="#" className="text-blue-600">
                  Notification Setting
                </a>
              </h2>
            </div>
            <button
              className={`bg-blue-500 mb-6 hover:bg-blue-700 text-white font-semibold py-3 px-8  rounded-lg focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
