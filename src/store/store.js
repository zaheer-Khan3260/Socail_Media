import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import messageSlice from './messageSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        message: messageSlice,
    }
});


export default store;