import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    likeCount: 0,
}

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        likeSend: (state, action) => {
            state.status = true;
            state.likeCount = action.payload.likeCount;

        },

        likeEnd: (state) => {
            state.status = false;
            state.likeCount = 0;
        }
    }
})

export const {likeSend, likeEnd} = likeSlice.actions;

export default likeSlice.reducer