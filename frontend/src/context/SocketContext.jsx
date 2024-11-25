import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeSocket, disconnectSocket } from "../utils/socket";
import SocketEventListeners from "../components/SocketEventListener"; // Import the SocketEventListeners component

const SocketContext = createContext();

export const SocketProvider = ({ user, children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        let socketInstance;

        if (user) {
            // Initialize socket only if `user` exists
            socketInstance = initializeSocket(user._id);
            setSocket(socketInstance);

            return () => {
                disconnectSocket();
                setSocket(null);
            };
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            <SocketEventListeners /> {/* Add the socket event listener component */}
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);


