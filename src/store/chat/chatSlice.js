import { createSlice } from '@reduxjs/toolkit';

import chatApis from './chatQuerys';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatHistory: {},
  },
  reducers: {
    // get new message through socket
    addNewMessage: (state, action) => {
      console.log(
        'fwerfwerf',
        state.chatHistory[action?.payload?.conversationId]
      );
      if (state.chatHistory[action?.payload?.conversationId]) {
        state.chatHistory[action?.payload?.conversationId].data.unshift(
          action?.payload?.content
        );
      }
    },
  },
  extraReducers: (builder) => {
    // if getConversation apis response fulfilled then matcher will be true hence callback function will execute
    builder.addMatcher(
      chatApis.endpoints.getConversation.matchFulfilled,
      (state, action) => {
        const conversationId = action?.meta?.arg?.originalArgs?.conversationId;
        if (state.chatHistory[conversationId]) {
          state.chatHistory[conversationId].data.push(
            ...(action?.payload?.data?.data ?? [])
          );
          state.chatHistory[conversationId].totalPage =
            action?.payload?.data?.totalPage;
        } else {
          state.chatHistory[conversationId] = {
            data: [...(action?.payload?.data?.data ?? [])],
            totalPage: action?.payload?.data?.totalPage,
          };
        }
      }
    );
  },
});

export const { addNewMessage } = chatSlice.actions;

export default chatSlice.reducer;

export const getChatHistory = (state, conversationId) => {
  return state?.chat?.chatHistory?.[conversationId] ?? [];
};
