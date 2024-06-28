import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index.js";
import { useDispatch } from "react-redux";
import serialize from 'serialize-javascript';
import { useForm } from "react-hook-form";
import axios from "axios";

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
      const response = await axios.post(
        `http://localhost:5000/api/v1/users/register`,
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
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg  rounded-xl p-10`}>
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
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label=" Username"
              placeholder="Username"
              {...register("username", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
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
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Input
              label="Avatar: "
              type="file"
              {...register("avatar", {
                required: true,
              })}
            />

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
