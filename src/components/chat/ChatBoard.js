import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Toolbar from '@mui/material/Toolbar';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useGetConversationMutation } from '../../store/chat/chatQuerys';
import { addNewMessage, getChatHistory } from '../../store/chat/chatSlice';
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
const ChatBoard = ({ activeUser }) => {
  const { conversationId, chatUser } = activeUser;
  const currentUserRef = useRef({});
  const scrollRef = useRef();
  const lastScrollPosition = useRef();
  const [message, setMessage] = useState('');
  const chatHistory = useSelector((state) =>
    getChatHistory(state, conversationId)
  );
  const dispatch = useDispatch();

  const [getConversationData, { isLoading }] = useGetConversationMutation();

  useEffect(() => {
    socket.on('getMessage', getNewSocketMsg);
    return () => {
      socket.off('getMessage', getNewSocketMsg);
    };
  }, []);

  useEffect(() => {
    // if chat is not loaded then getInitial data
    if (!currentUserRef?.current?.[conversationId]) {
      currentUserRef.current[conversationId] = {
        currentPage: 1,
        totalPage: 1,
      };
      currentUserRef.current[conversationId] = 1;
      const payload = {
        conversationId,
        pgNumber: currentUserRef.current[conversationId],
      };
      getConversationData(payload);
    }
  }, [conversationId]);

  const handleScroll = () => {
    if (
      isLoading ||
      chatHistory?.totalPage === currentUserRef.current[conversationId]
    )
      return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    lastScrollPosition.current = scrollTop;

    console.log('height', scrollTop, scrollHeight, clientHeight);
    const endOfPage = Math.abs(scrollTop) + clientHeight + 2 >= scrollHeight;
    if (endOfPage) {
      console.log('Call api');
      currentUserRef.current[conversationId] += 1;
      const payload = {
        conversationId,
        pgNumber: currentUserRef.current[conversationId],
      };
      getConversationData(payload);
    }
  };

  const getNewSocketMsg = (msg) => {
    console.log('msgmsg', msg);
    const payLoad = {
      conversationId: msg?.data?.conversationId,
      content: msg?.data,
    };
    dispatch(addNewMessage(payLoad));
  };

  const sendMessage = () => {
    const obj = {
      receiverId: activeUser?.chatUser?._id,
      content: message,
    };
    scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    socket.emit('sendMessage', obj);
    setMessage('');
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ borderBottom: '1px solid #d3d3d3', flex: '0 1 auto' }}
      >
        <Toolbar disableGutters>
          <IconButton onClick={() => {}} sx={{ p: 0 }}>
            <Avatar
              alt={chatUser?.firstname}
              src="/static/images/avatar/2.jpg"
            />
            &nbsp;&nbsp;{chatUser?.firstname}
          </IconButton>
        </Toolbar>
      </Container>

      <div
        id="history"
        className={`${style['chat-history']}`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {isLoading ? (
          <Loader
            sx={{ position: 'absolute', top: '75px', alignSelf: 'center' }}
          />
        ) : null}
        {chatHistory?.data?.length > 0 ? (
          <ChatHistory chatData={chatHistory?.data} />
        ) : (
          !isLoading && 'No Data Found'
        )}
      </div>

      <Box sx={{ display: 'flex', flex: '0 1 auto', padding: '8px 10px' }}>
        <OutlinedInput
          sx={inputSx}
          value={message}
          placeholder="Type message"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
        />
        <Button
          sx={{ borderRadius: '30px', width: '5vw' }}
          variant="contained"
          onClick={sendMessage}
          disabled={message === ''}
        >
          Send
        </Button>
      </Box>
      <div></div>
    </>
  );
};

export default ChatBoard;

ChatBoard.propTypes = {
  activeUser: PropTypes.object,
};
