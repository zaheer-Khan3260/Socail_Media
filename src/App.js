import './App.css';
import {login, logout} from "./store/authSlice.js"
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Header, Footer } from './component/index.js';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './component/LoadingSpinner/LoadinSpinner.jsx';
import api from './api.js';


function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userStatus = useSelector(state => state.auth.status)

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
      setLoading(true);    
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
  ) :  <div className={`absolute flex h-screen backdrop-blur-lg  top-0 w-full`}>
  <LoadingSpinner/>
</div>
    
};

export default App;
