import React from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext'; // Import SocketProvider
import SocketEventListeners from './components/SocketEventListener'; // Import the SocketEventListeners component
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import MainLayout from './components/MainLayout';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import ChatPage from './components/ChatPage';
import Signup from './components/SignUp';

// Define routes for the app
const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
      children: [
        {
          path: '/',
          element: <ProtectedRoutes><Home /></ProtectedRoutes>
        },
        {
          path: '/profile/:id',
          element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
        },
        {
          path: '/account/edit',
          element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
        },
        {
          path: '/chat',
          element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
  ])

function App() {
    const { user } = useSelector((state) => state.auth);

   
    return (
        <SocketProvider user={user}>
            <SocketEventListeners /> {/* Add the socket event listener component */}
            <RouterProvider router={browserRouter} />
        </SocketProvider>
    );
}

export default App;



