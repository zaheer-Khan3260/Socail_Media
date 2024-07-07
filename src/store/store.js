import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import messageSlice from './messageSlice';
import conversationSlice from './conversationSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        message: messageSlice,
        conversation: conversationSlice,
    }
});


export default store;