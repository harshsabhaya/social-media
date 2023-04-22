import React from 'react';

import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

import { formatTime } from './../../utils/timeDate';
import style from './Chat.module.css';

const ChatHistory = ({ chatData }) => {
  const { _id: userId } = useSelector((state) => state?.profile?.userProfile);

  return (
    <>
      {chatData.map((data) => {
        const { _id, content, senderId, created_at } = data;
        const isCurrentUser = senderId === userId;
        // const date = new Date(created_at);
        return (
          <div
            key={_id}
            className={`${style['chat-msg']} ${
              isCurrentUser ? style['chat-msg-self'] : style['chat-msg-another']
            }`}
          >
            {content}
            <span
              style={{
                fontSize: '10px',
                paddingLeft: '5px',
                verticalAlign: '-3px',
                whiteSpace: 'nowrap',
              }}
            >
              {formatTime(new Date(created_at))}
            </span>
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
