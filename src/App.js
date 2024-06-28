import './App.css';
import {login, logout} from "./store/authSlice.js"
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { Header, Footer } from './component/index.js';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/users/current-user`);
        const userData = response.data.data
        console.log("userData in app.js",userData);
        if (userData) {
          dispatch(login({userData: userData}))
        }else {
        dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
   fetchData();
  });

  // useEffect(() => {
  //   if (!loading && !userStatus) {
  //     navigate("/login");
  //   }
  // }, [loading, userStatus, navigate]);

   return !loading ? (
   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : <div className='flex justify-center align-center text-blue-600 text-lg'>
    Loading.......
   </div>
    
};

export default App;
