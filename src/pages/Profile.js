import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import { getUserProfile } from '../store/user-profile/userProfileThunk';

const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Profile);
  console.log(state);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return <Header />;
};

export default Profile;
