import React from 'react';

import { useSelector } from 'react-redux';

import { getProfile } from '../../store/user-profile/userProfileThunk';
import { USER_PROFILE } from '../../utils/config';
import style from './Profile.module.css';

const Account = () => {
  const userProfile = useSelector(getProfile);
  console.log('userProfile', userProfile);
  return (
    <>
      <div className={`${style['account-top-div']}`}>
        <img className={`${style['profile-img']}`} src={USER_PROFILE} alt="" />
      </div>
    </>
  );
};

export default Account;
