import { io } from "socket.io-client";

let socket; // Singleton instance

export const initializeSocket = (userId) => {
    console.log("Initializing socket with userId:", userId);
    if (!socket) {
        socket = io("http://localhost:8000", {
            query: { userId },
            transports: ["websocket"],
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket is not initialized. Call initializeSocket first.");
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
