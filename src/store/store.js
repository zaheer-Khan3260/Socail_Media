import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import messageSlice from './messageSlice';
import conversationSlice from './conversationSlice';
import likeSlice from './likeSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        message: messageSlice,
        conversation: conversationSlice,
        like: likeSlice
    }
});


export default store;