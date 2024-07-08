import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../src/store/store.js';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import axios from 'axios';
import { Buffer } from 'buffer';
// import AllPost from './Pages/AllPosts.jsx';
import AddPost from './Pages/AddPost.jsx'
import Post from './Pages/Post.jsx';
import EditPostPages from './Pages/EditPostPages.jsx';
import {ProtectedLayer, Login} from './component/index.js';
import ProfilePage from './Pages/ProfilePage.jsx';
import EditUserProfile from './Pages/EditUserProfile.jsx';
import Chatdisplay from './Pages/Chatdisplay.jsx';
import MessagePagesNew from './Pages/MessagePagesNew.jsx';
import { SocketContextProvider } from './store/socketContext.js';


axios.defaults.withCredentials = true;
window.Buffer = Buffer
const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <ProtectedLayer authentication={false}>
                <Login />
            </ProtectedLayer>
        ),
    },
    {
        path: "/signup",
        element: (
            <ProtectedLayer authentication={false}>
                <SignupPage />
            </ProtectedLayer>
        ),
    },
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: (
                <ProtectedLayer authentication>
                    {" "}
                    <Home/>
                </ProtectedLayer>
            ),
        },
       
        {
            path: "/add-post",
            element: (
                <ProtectedLayer authentication>
                    {" "}
                    <AddPost />
                </ProtectedLayer>
            ),
        },

        {
            path: "/messages",
            element: (
                <ProtectedLayer authentication>
                    {" "}
                    <MessagePagesNew />
                </ProtectedLayer>
            ),
            children:[
                {
                    path: ":conversationId",
                    element: (
                        <ProtectedLayer authentication>
                            {" "}
                            <Chatdisplay />
                        </ProtectedLayer>
                    ),
                },
            ]
        },
        {
            path: "/edit-post/:slug",
            element: (
                <ProtectedLayer authentication>
                    {" "}
                    <EditPostPages />
                </ProtectedLayer>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/profile/:UserId",  
            element:<ProfilePage /> 
        
             
        },
        {
            path:"/profile/:UserId/editprofile",
            element: <EditUserProfile/>
       
        },
    ],
},
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <SocketContextProvider>
    <RouterProvider router={router} />
    </SocketContextProvider>
    </Provider>
  </React.StrictMode>
);


