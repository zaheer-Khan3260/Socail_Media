import React, { useEffect, useState } from 'react';
import Input from './Input';
import userImage from "./Images/user.png";
import LoadingSpinner from "./LoadingSpinner/LoadinSpinner.jsx"
import api from '../api';
import { Link } from 'react-router-dom';

function Search() {
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!searchText) {
        setUser(null);
        return;
      }

      setLoading(true);
      try {
        const res = await api.post("/api/v1/users/searchUser", {
          username: searchText
        });

        if (res.data && res.data.data) {
          setUser(res.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("An error occurred while fetching users", error.message);
        setUser(null);
      }
      setLoading(false);
    };

    const debounce = setTimeout(() => {
      fetchUserData();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchText]);

  return (
    <div className='w-full h-screen p-3'>
      <div className='w-full h-24 text-center'>
        <Input
          type="search"
          placeholder="Enter Username"
          ClassName="w-full md:w-[25rem]"
          onChange={handleInputChange}
        />
      </div>
      <div className='w-full h-[90%] overflow-auto flex flex-col items-center'>
        {loading ? (
          <div className="absolute flex h-full backdrop-blur-lg top-0 w-full">
            <LoadingSpinner />
          </div>
        ) : user ? (
            user.map((data) => (
                <Link to={`/profile/${data._id}`} >

          <div className='border-2 border-blue-500 rounded-3xl w-[25rem] h-20 flex items-center p-3'>
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <img
                src={data?.avatar || userImage}
                alt="userProfile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="text-lg font-bold text-white ml-3">{data?.username}</p>
          </div>
          </Link>
        ))) : !user ? (
          <div className="text-lg font-bold text-red-600">No user found</div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;