import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConnectionStatus } from "../redux/socketSlice"; // Action to set connection status
import { setOnlineUsers } from "../redux/chatSlice"; // Action to set online users
import { setLikeNotification } from "../redux/rtnSlice"; // Action to set real-time notifications
import { useSocket } from "../context/SocketContext"; // Custom hook to access socket instance

function SocketEventListeners() {
    const dispatch = useDispatch();
    const socket = useSocket(); // Get socket instance from context

    useEffect(() => {
        if (socket) {
            // Listen for socket connection status
            socket.on("connect", () => dispatch(setConnectionStatus(true)));
            socket.on("disconnect", () => dispatch(setConnectionStatus(false)));

            // Listen for online users
            socket.on("getOnlineUsers", (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            // Listen for real-time notifications (like/dislike)
            socket.on("notification", (notification) => {
                dispatch(setLikeNotification(notification));
            });
        }

        // Cleanup event listeners when component unmounts or socket changes
        return () => {
            if (socket) {
                socket.off("connect");
                socket.off("disconnect");
                socket.off("getOnlineUsers");
                socket.off("notification");
            }
        };
    }, [socket, dispatch]);

    return null; // This component does not render anything
}

export default SocketEventListeners;
