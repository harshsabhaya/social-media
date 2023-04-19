import { Navigate, createBrowserRouter } from 'react-router-dom';

import { AuthRedirect } from './context/AuthContext';
import HomePage from './pages//HomePage';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const routerWrapper = (component, isAuth = true) => {
  return <AuthRedirect isAuth={isAuth}>{component}</AuthRedirect>;
};

export const routes = createBrowserRouter([
  {
    path: '/',
    element: routerWrapper(<HomePage />),
  },
  {
    path: '/login',
    element: routerWrapper(<Login />, false),
  },
  {
    path: '/signup',
    element: routerWrapper(<Signup />, false),
  },
  {
    path: '/profile',
    element: routerWrapper(<Profile />),
  },
  {
    path: '/chat',
    element: routerWrapper(<Chat />),
    children: [{ path: '/chat/:cid', element: routerWrapper(<Chat />) }],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
