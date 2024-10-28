// src/socket.js
import { io } from "socket.io-client";
import store from "./../redux/store"; // Adjust the path if necessary
import { setConnectionStatus } from "../redux/socketSlice";
import { setOnlineUsers } from "../redux/chatSlice";
import { setLikeNotification } from "../redux/rtnSlice";

const connectSocket = (user) => {
  if (!user || !user._id) {
    console.error("User ID is missing, cannot connect socket.");
    return null;
  }

  // Create a socket instance with options
  const socketio = io('http://localhost:8001', {
    query: {
      userId: user._id,
    },
    transports: ['websocket', 'polling'], // Fallback to polling if WebSocket fails
    autoConnect: false, // Manually control the connection
  });

  // Log connection status
  socketio.on('connect', () => {
    console.log('WebSocket connection established:', socketio.id);
    store.dispatch(setConnectionStatus(true));
  });

  socketio.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error.message);
  });

  socketio.on('disconnect', (reason) => {
    console.warn('WebSocket disconnected:', reason);
    store.dispatch(setConnectionStatus(false));
  });

  socketio.on('reconnect_attempt', () => {
    console.log('Reconnecting WebSocket...');
  });

  // Listen for custom events
  socketio.on('getOnlineUsers', (onlineUsers) => {
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socketio.on('notification', (notification) => {
    store.dispatch(setLikeNotification(notification));
  });

  // Start the connection manually
  socketio.connect();

  return socketio;
};




const disconnectSocket = (socket) => {
    if (socket) {
        socket.close();
        store.dispatch(setConnectionStatus(null));
    }
};

export { connectSocket, disconnectSocket };



