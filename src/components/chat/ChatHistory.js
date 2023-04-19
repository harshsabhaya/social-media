import React, { useEffect } from 'react';

import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

import style from './Chat.module.css';

const ChatHistory = ({ chatData }) => {
  const { _id: userId } = useSelector((state) => state?.profile?.userProfile);

  useEffect(() => {
    console.log('asddas');
  }, []);
  return (
    <>
      {chatData.map((data) => {
        const { _id, content, senderId } = data;
        const isCurrentUser = senderId === userId;
        return (
          <div
            key={_id}
            className={`${style['chat-msg']} ${
              isCurrentUser ? style['chat-msg-self'] : style['chat-msg-another']
            }`}
          >
            {content}
          </div>
        );
      })}
    </>
  );
};

export default ChatHistory;

ChatHistory.propTypes = {
  chatData: PropTypes.array,
};
