import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getUserProfile } from '../../store/user-profile/userProfileThunk';
import Header from './../Header';

const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Profile);
  console.log(state);
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return <Header />;
};

export default Profile;
