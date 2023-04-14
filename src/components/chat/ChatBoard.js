import React from 'react';

import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Toolbar from '@mui/material/Toolbar';
import { PropTypes } from 'prop-types';

import { useGetConversationQuery } from '../../store/chat/chatQuerys';

const sx = {
  'width': '100%',
  'borderRadius': '50px',
  'border': '1px solid #d3d3d3',
  'marginTop': 'auto',
  '&.Mui-focused': {},
};
const ChatBoard = ({ activeUser }) => {
  const { conversationId, chatUser } = activeUser;
  const { data } = useGetConversationQuery(conversationId);
  console.log(data, conversationId);

  return (
    <>
      <Container maxWidth="xl" sx={{ borderBottom: '1px solid #d3d3d3' }}>
        <Toolbar disableGutters>
          <IconButton onClick={() => {}} sx={{ p: 0 }}>
            <Avatar
              alt={chatUser?.firstname}
              src="/static/images/avatar/2.jpg"
            />
            &nbsp;&nbsp;{chatUser?.lastname}
          </IconButton>
        </Toolbar>
      </Container>
      <div style={{}}>hello</div>
      <OutlinedInput sx={sx} placeholder="Type message" />
      <div></div>
    </>
  );
};

export default ChatBoard;

ChatBoard.propTypes = {
  activeUser: PropTypes.object,
};
