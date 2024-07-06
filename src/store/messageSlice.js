import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    senderData: null
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        send: (state, action) => {
            state.status = true;
            state.senderData = action.payload.senderData;
        },

        sendFinished: (state) => {
            state.status = false;
            state.senderData = null
        }
    }
})

export const {send, sendFinished} = messageSlice.actions;

export default messageSlice.reducer