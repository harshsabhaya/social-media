import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';

import ChatBoard from '../components/chat/ChatBoard';
import ChatListCard from '../components/chat/ChatListCard';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { useConversationListQuery } from '../store/chat/chatQuerys';
import { socket } from '../utils/socket';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
}));

const CONTAINERCSS = {
  height: 'calc(100vh - 68.5px)',
  position: 'relative',
  top: '15px',
};

const Chat = () => {
  const { data: conversationList, isFetching } = useConversationListQuery();
  const [activeUser, setActiveUser] = useState({});
  const navigate = useNavigate();
  let { cid } = useParams();

  const handleUserChange = (user) => {
    navigate(`/chat/${user?.conversationId}`);
    setActiveUser(user);
  };

  useEffect(() => {
    const data =
      conversationList?.data?.length > 0
        ? conversationList?.data.find((user) => user.conversationId === cid)
        : [];
    setActiveUser(data);
  }, [conversationList, cid]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket.connected', socket.connected); // true
    });
    return () => {
      socket.on('disconnect', () => {
        console.log('disconnect', socket.connected); // false
      });
    };
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={CONTAINERCSS}>
        <Grid container spacing={2} pb={2} sx={{ height: 'inherit' }}>
          <Grid item xl={3} xs={6} md={4}>
            <Item>
              {isFetching ? (
                <Loader sx={{ margin: 'auto' }} />
              ) : conversationList?.data?.length > 0 ? (
                <List
                  sx={{
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  {conversationList?.data.map(
                    (user, index) =>
                      user?.chatUser?._id && (
                        <ChatListCard
                          key={user?.chatUser?._id}
                          user={user}
                          isLast={index === conversationList?.data?.length - 1}
                          onClick={handleUserChange}
                          isActive={
                            activeUser?.conversationId === user.conversationId
                          }
                        />
                      )
                  )}
                </List>
              ) : (
                <div style={{ margin: 'auto' }}>No conversation found</div>
              )}
            </Item>
          </Grid>
          <Grid item xl={9} xs={6} md={8}>
            <Item>
              {activeUser?.conversationId ? (
                <ChatBoard activeUser={activeUser} />
              ) : (
                <div style={{ margin: 'auto' }}>No chat found</div>
              )}
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Chat;
