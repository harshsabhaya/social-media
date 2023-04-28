import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Toolbar from '@mui/material/Toolbar';
import { useOutletContext } from 'react-router-dom';

import { useLazyGetConversationMergeQuery } from '../../store/chat/chatQuerys';
import { socket } from '../../utils/socket';
import Loader from '../Loader';
import style from './Chat.module.css';
import ChatHistory from './ChatHistory';

const inputSx = {
  'width': '100%',
  'borderRadius': '50px',
  'border': '1px solid #d3d3d3',
  '&.Mui-focused': {},
  'marginRight': '10px',
  'height': '44px',
  'boxShadow': 'rgba(0, 0, 0, 0.1) 1px -10px 50px',
};
const ChatBoard = () => {
  const { conversationId, chatUser } = useOutletContext();

  const paginationRef = useRef({});
  const scrollRef = useRef();
  const [message, setMessage] = useState('');

  const [getNewData, { data: chatData, isFetching, originalArgs }] =
    useLazyGetConversationMergeQuery();

  useEffect(() => {
    getNewData({
      conversationId,
      pgNumber: 1,
    });
    paginationRef.current[conversationId] = 1;
  }, [getNewData, conversationId]);

  const handleScroll = () => {
    if (
      isFetching ||
      chatData?.data?.totalPage === paginationRef.current[conversationId]
    )
      return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const endOfPage = Math.abs(scrollTop) + clientHeight >= scrollHeight;
    if (endOfPage) {
      paginationRef.current[conversationId] += 1;
      getNewData({
        conversationId,
        pgNumber: paginationRef.current[conversationId],
      });
    }
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    socket.emit('sendMessage', {
      receiverId: chatUser?._id,
      content: message,
    });
    setMessage('');
  };
  console.log('message', message.trim());
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ borderBottom: '1px solid #d3d3d3', flex: '0 1 auto' }}
      >
        <Toolbar disableGutters>
          <IconButton
            sx={{
              'p': 0,
              'cursor': 'auto',
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            <Avatar
              alt={chatUser?.firstname}
              src="/static/images/avatar/2.jpg"
              sx={{ marginRight: '10px' }}
            />
            {chatUser?.firstname}
          </IconButton>
        </Toolbar>
      </Container>

      <div
        id="history"
        className={`${style['chat-history']}`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {isFetching ? (
          <Loader
            sx={{ position: 'absolute', top: '75px', alignSelf: 'center' }}
          />
        ) : null}

        {/* it will check requested data and current cache data  */}
        {chatData?.conversationId === originalArgs?.conversationId &&
        chatData?.data?.data?.length > 0 ? (
          <ChatHistory chatData={chatData?.data?.data} />
        ) : (
          !isFetching && 'No Data Found'
        )}
      </div>

      <Box sx={{ display: 'flex', flex: '0 1 auto', padding: '8px 10px' }}>
        <OutlinedInput
          sx={inputSx}
          value={message}
          placeholder="Write a message here"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
        />
        <Button
          sx={{ borderRadius: '30px', width: '5vw' }}
          variant="contained"
          onClick={sendMessage}
          disabled={message.trim() === ''}
        >
          Send
        </Button>
      </Box>
      <div></div>
    </>
  );
};

export default ChatBoard;
