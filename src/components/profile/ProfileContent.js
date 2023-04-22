import React from 'react';

import { Navigate, useOutletContext, useParams } from 'react-router-dom';

import Account from './Account';

const ProfileContent = () => {
  const outletContext = useOutletContext();
  const { tabName } = useParams();
  let component = '';
  switch (tabName) {
    case 'account':
      component = <Account />;
      break;

    case 'password':
      component = 'Password';
      break;

    case 'followers':
      component = 'Followers';
      break;

    case 'followings':
      component = 'Followings';
      break;

    default:
      component = <Navigate to="/profile" replace />;
  }

  console.log('outletContext', outletContext);
  return component;
};

export default ProfileContent;
