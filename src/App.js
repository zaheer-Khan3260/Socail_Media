import './App.css';
import {login, logout} from "./store/authSlice.js"
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { Header, Footer } from './component/index.js';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from './api.js';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/users/current-user");
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
  }, []);

   return !loading ? (
   <div className='min-h-screen'>
      <div className='md:grid grid-cols-4 '>
        <div className='bg-[#0f171f]'>
        <Header />
        </div>
        <main className=' md:overflow-auto md:col-span-3 bg-[#0f171f] '>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <div className='flex justify-center align-center text-blue-600 text-lg'>
    Loading.......
   </div>
    
};

export default App;
