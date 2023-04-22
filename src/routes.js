import { Navigate, createBrowserRouter } from 'react-router-dom';

import ChatBoard from './components/chat/ChatBoard';
import Header from './components/Header';
import ProfileContent from './components/profile/ProfileContent';
import { AuthRedirect } from './context/AuthContext';
import Chat from './pages/Chat';
import Followers from './pages/Followers';
import Followings from './pages/Followings';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const routerWrapper = (component, isAuth = true) => {
  return <AuthRedirect isAuth={isAuth}>{component}</AuthRedirect>;
};

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: routerWrapper(<Login />, false),
  },
  {
    path: '/signup',
    element: routerWrapper(<Signup />, false),
  },
  {
    path: '/',
    element: routerWrapper(<Header />),
    children: [
      {
        path: '/',
        element: routerWrapper(<HomePage />),
      },
      {
        path: '/profile',
        element: routerWrapper(<Profile />),
        children: [
          {
            path: '/profile/:tabName',
            element: routerWrapper(<ProfileContent />),
          },
        ],
      },
      {
        path: '/chat',
        element: routerWrapper(<Chat />),
        children: [{ path: '/chat/:cid', element: <ChatBoard /> }],
      },
      {
        path: '/followings',
        element: routerWrapper(<Followings />),
      },
      {
        path: '/followers',
        element: routerWrapper(<Followers />),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
