import React from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PropTypes } from 'prop-types';

export default function ChatListCard({ user, isLast, onClick, isActive }) {
  const { chatUser } = user;
  return (
    <>
      <ListItemButton selected={isActive} onClick={() => onClick(user)}>
        <ListItemAvatar>
          <Avatar alt={chatUser?.firstname} src="2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={`${chatUser?.firstname} ${chatUser?.lastname}`}
          secondary={chatUser?.email}
        />
      </ListItemButton>
      {!isLast && <Divider variant="fulwidth" component="" />}
    </>
  );
}

ChatListCard.propTypes = {
  isActive: PropTypes.bool,
  isLast: PropTypes.bool,
  user: PropTypes.object,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  onClick: PropTypes.func,
};
