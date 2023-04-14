import { Navigate, createBrowserRouter } from 'react-router-dom';

import Chat from './components/chat/Chat';
import HomePage from './components/HomePage';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Signup from './components/signup/Signup';
import { AuthRedirect } from './context/AuthContext';

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
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
