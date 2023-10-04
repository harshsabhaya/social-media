import { createContext, useContext, useEffect, useState } from 'react';

import jwt_decode from 'jwt-decode';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, matchRoutes, useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Login from '../pages/Login';
import { getUserProfile } from '../store/user-profile/userProfileThunk';
import { TOKEN } from '../utils/config';
import { getCookie, removeCookie, setCookie } from '../utils/cookiesManagement';
import em, { UNAUTHORIZED_USER } from '../utils/eventEmitter';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthWrapper = ({ children }) => {
  const [token, setToken] = useState(getCookie(TOKEN));
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state?.profile?.userProfile);

  useEffect(() => {
    if (token && !userProfile._id) dispatch(getUserProfile());
  }, [dispatch, token, userProfile._id]);

  em.on(UNAUTHORIZED_USER, () => {
    setToken('');
    removeCookie(TOKEN);
  });

  const handleAuth = (data) => {
    if (data?.token) {
      const { exp } = jwt_decode(data?.token);
      setCookie(TOKEN, data?.token, exp);
    }
    setToken(data?.token ?? '');
  };
  const value = {
    isAuth: token ? true : false,
    token: token ?? '',
    setAuth: handleAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;

const nonAuthPages = ['/login', '/signup'];

export const AuthRedirect = () => {
  const { isAuth: isLogin } = useAuth();
  const location = useLocation();

  const authenticatedRouter = !matchRoutes(
    nonAuthPages.map((path) => ({
      path,
    })),
    location.pathname
  );
  if (isLogin && !authenticatedRouter) {
    // redirect to homepage;
    return <Navigate to="/" />;
  } else if (!isLogin && authenticatedRouter) {
    // redirect to login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return authenticatedRouter && isLogin ? <Header /> : <Login />;
};
