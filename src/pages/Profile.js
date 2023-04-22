import React, { useEffect } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';

import { getUserProfile } from '../store/user-profile/userProfileThunk';
import { THEME_COLOR } from '../utils/config';

const Profile = () => {
  const dispatch = useDispatch();
  const headerRef = useOutletContext();
  const navigate = useNavigate();
  const { tabName } = useParams();
  const { firstname, lastname, email, totalFollower, totalFollowing } =
    useSelector((state) => state?.profile?.userProfile);
  console.log('state', firstname, lastname, email, tabName);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // default profile page
  if (tabName === '' || tabName === undefined) {
    // navigate(-1);
    return <Navigate to="/profile/account" />;
  }

  const tabList = [
    {
      name: 'Account',
      path: 'account',
    },
    {
      name: 'Change Password',
      path: 'password',
    },
    {
      name: `Followers ${totalFollower ? `(${totalFollower})` : ''}`,
      path: 'followers',
    },
    {
      name: `Followings ${totalFollowing ? `(${totalFollowing})` : ''}`,
      path: 'followings',
    },
  ];

  return (
    <div
      className=""
      style={{
        display: 'flex',
        height: `calc(100vh - ${headerRef?.clientHeight}px)`,
        backgroundColor: '#bdbdbd29',
      }}
    >
      <div
        style={{
          width: '15vw',
          overflowY: 'auto',
          padding: '30px',
          cursor: 'pointer',
          borderRadius: '10px',
          backgroundColor: '#fff',
          margin: '10px 5px 10px 10px',
        }}
      >
        {tabList.map((tab, index) => (
          <List
            key={index}
            sx={{
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <ListItemButton
              selected={tab.path === tabName}
              sx={{
                borderRadius: '14px',
                width: 'fit-content',
                color: `${tab.path === tabName ? THEME_COLOR : ''}`,
                padding: '12px 20px',
                fontWeight: `${tab.path === tabName ? '500' : ''}`,
              }}
              onClick={() => navigate(`/profile/${tab.path}`)}
            >
              {tab.name}
            </ListItemButton>
          </List>
        ))}
      </div>
      <div
        style={{
          width: '85vw',
          backgroundColor: '#fff',
          borderRadius: '0 0 10px 10px',
          margin: '10px 10px 10px 5px',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
