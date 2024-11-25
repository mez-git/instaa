import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socketio",
    initialState: {
        isConnected: false,
    },
    reducers: {
        setConnectionStatus: (state, action) => {
            state.isConnected = action.payload; // true/false
        },
    },
});

export const { setConnectionStatus } = socketSlice.actions;
export default socketSlice.reducer;

