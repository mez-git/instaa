// src/redux/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socketio",
    initialState: {
        // You can store flags or metadata if needed, but no socket instance
        isConnected: false, // Example flag to indicate connection status
    },
    reducers: {
        // Actions
        // Action to update connection status
        setConnectionStatus: (state, action) => {
            state.isConnected = action.payload; // true or false based on connection
        },
        // You can add other socket-related actions here as needed
    },
});

export const { setConnectionStatus } = socketSlice.actions;
export default socketSlice.reducer;