import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useConversationListQuery } from '../../store/chat/chatQuerys';
import Header from '../Header';
import ChatBoard from './ChatBoard';
import ChatListCard from './ChatListCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
}));

const Chat = () => {
  const { data: conversationList } = useConversationListQuery();
  const [activeUser, setActiveUser] = useState({});

  const handleUserChange = (user) => {
    setActiveUser(user);
  };

  return (
    <>
      <Header />
      <div>
        <Container maxWidth="lg" sx={{}}>
          <Box sx={{ flexGrow: 1, pt: '100px' }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Item>
                  <List
                    sx={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  >
                    {conversationList?.data?.length > 0
                      ? conversationList?.data.map((user, index) => (
                          <ChatListCard
                            key={user._id}
                            user={user}
                            isLast={
                              index === conversationList?.data?.length - 1
                            }
                            onClick={handleUserChange}
                            isActive={
                              activeUser?.conversationId === user.conversationId
                            }
                          />
                        ))
                      : null}
                  </List>
                </Item>
              </Grid>
              <Grid item xs={6} md={8}>
                <Item>
                  {activeUser?.conversationId ? (
                    <ChatBoard activeUser={activeUser} />
                  ) : null}
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Chat;
