import { createContext, useContext, useEffect, useState } from 'react';

import jwt_decode from 'jwt-decode';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TOKEN } from '../lib/config';
import em, { UNAUTHORIZED_USER } from '../lib/eventEmitter';
import { getUserProfile } from '../store/user-profile/userProfileThunk';
import { getCookie, removeCookie, setCookie } from '../utils/cookiesManagement';

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

export const AuthRedirect = ({ children, isAuth = true }) => {
  const { isAuth: isLogin } = useAuth();

  if (isLogin && !isAuth) {
    // redirect to homepage;
    return <Navigate to="/" />;
  } else if (!isLogin && isAuth) {
    // redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};

AuthRedirect.propTypes = {
  children: PropTypes.node,
  isAuth: PropTypes.bool,
};
