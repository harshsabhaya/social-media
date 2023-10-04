import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';

import ChatBoard from './components/chat/ChatBoard';
import ProfileContent from './components/profile/ProfileContent';
import { AuthRedirect, useAuth } from './context/AuthContext';
import Chat from './pages/Chat';
import Followers from './pages/Followers';
import Followings from './pages/Followings';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

function App() {
  const { isAuth } = useAuth();
  const defaultNavigate = (
    <Navigate to={isAuth ? './dashboard' : './sign-in'} />
  );

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthRedirect />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/profile',
          element: <Profile />,
          children: [
            {
              path: '/profile/:tabName',
              element: <ProfileContent />,
            },
          ],
        },
        {
          path: '/chat',
          element: <Chat />,
          children: [{ path: '/chat/:cid', element: <ChatBoard /> }],
        },
        {
          path: '/followings',
          element: <Followings />,
        },
        {
          path: '/followers',
          element: <Followers />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          index: true,
          element: defaultNavigate,
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
