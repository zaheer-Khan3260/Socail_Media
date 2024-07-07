import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    conversationData: null
}

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        conversationSend: (state, action) => {
            state.status = true;
            state.conversationData = action.payload.conversationData;
        },

        conversationEnd: (state) => {
            state.status = false;
            state.conversationData = null
        }
    }
})

export const {conversationSend, conversationEnd} = conversationSlice.actions;

export default conversationSlice.reducer