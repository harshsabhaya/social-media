import { createContext, useState } from 'react';

const User = createContext();

const UserContext = ({ children }) => {
  const [] = useState();
  const obj = {
    headerHeight: '',
  };
  return <User.Provider value={obj}>{children}</User.Provider>;
};
export default UserContext;
