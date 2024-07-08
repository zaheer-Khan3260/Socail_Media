import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageData: null
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        sendMessages: (state, action) => {
            
            state.messageData = action.payload.messageData;
        },

        endMessages: (state) => {
            state.messageData = null
        }
    }
})

export const {sendMessages, endMessages} = messageSlice.actions;

export default messageSlice.reducer