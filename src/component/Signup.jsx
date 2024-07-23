import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Input } from "./index.js";
import LoadingSpinner from "./LoadingSpinner/LoadinSpinner.jsx";
import { useDispatch } from "react-redux";
import userImage from "./Images/user.png";
import plusImage from "./Images/add.png";
import api from "../api.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const submitData = new FormData();
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }

    try {
      const response = await api.post("/api/v1/users/register", submitData, {
        withCredentials: true,
      });
      if (response.data) {
        const data = {
          email: response.data.data.email,
          password: formData.password
        }
        try {
          const response = await api.post("/api/v1/users/login", data);
          const userData = response.data.data;
          console.log("userdata by login", response.data.data);
          if (userData) {
            dispatch(login({ userData: userData.user }));
           setLoading(false);
            navigate("/");
          }
        } catch (error) {
          setError(error.message || "An error occure while logIn the user");
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="md:mx-auto w-[23rem] md:w-full max-w-lg rounded-xl p-10 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
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
            className="text-blue-600 font-semibold text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        <div className="text-red-600 text-center mb-4 rounded-2xl">{error}</div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-5">
            <div className="flex justify-between">
              <Input
                label="Full Name"
                name="fullname"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[90%]"
                required
              />
              <Input
                label="Username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[90%]"
                required
              />
            </div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[75%]"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[75%]"
              required
            />
            <div
              className={`relative w-full h-44 ${preview ? "hidden" : "block"}`}
            >
              <div className="top-0 left-0">
                <Input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  ClassName="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full md:w-80 h-36 py-8 absolute z-50 opacity-0"
                  required
                />
              </div>
              <div className="w-full md:w-80 h-36 border-2 rounded-3xl border-dashed border-gray-400 py-5 flex flex-col justify-center items-center absolute top-7 z-0">
                <div className="w-12 opacity-45">
                  <img src={plusImage} alt="" />
                </div>
                <div className="font-semibold opacity-75">Add Avatar</div>
                <div className="text-[12px]">
                  or <span className="text-blue-700">drag file</span> from your
                  system
                </div>
              </div>
            </div>
            <div className={`h-52 w-full ${preview ? "block" : "hidden"}`}>
              <div className="w-44 h-44 rounded-full border-2 border-gray-400 overflow-hidden mx-auto">
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative w-full flex justify-end">
                <div className="w-20 absolute top-0 right-4 rounded-xl text-white font-bold text-center py-1 h-8 bg-blue-700">
                  Change
                </div>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  className="w-20 right-4 top-0 absolute z-0 opacity-0"
                />
              </div>
            </div>
            <div className="relative xl:w-[26rem]">
              <input
                type="checkbox"
                className="absolute top-[0.38rem] left-1"
                required
              />
              <h2 className="inline-block ml-6 font-semibold">
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
              className="bg-blue-500 mb-6 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
      <div
        className={`absolute flex h-[150%] md:h-screen backdrop-blur-lg top-0 w-full ${
          loading ? "block" : "hidden"
        }`}
      >
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default Signup;
