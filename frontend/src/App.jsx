// src/App.jsx
import ChatPage from './components/ChatPage';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Profile from './components/Profile';
import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, disconnectSocket } from './components/socket'; // Import the functions
import ProtectedRoutes from './components/ProtectedRoutes';
import { useEffect } from 'react';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>,
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>,
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>,
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = connectSocket(user); // Connect the socket

      return () => {
        disconnectSocket(socketio); // Disconnect on unmount
      };
    } else if (socket) {
      disconnectSocket(socket); // Disconnect if there's an existing socket
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;

