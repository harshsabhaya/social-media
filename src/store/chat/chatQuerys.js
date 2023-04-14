import rtkApi from '../rtkApi';

const chatApis = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    conversationList: builder.query({
      query: () => {
        return {
          url: '/chats/get-conversations-list',
          method: 'GET',
        };
      },
    }),
    getConversation: builder.query({
      query: (id, pgNumber = 1, pgSize = 10) => {
        return {
          url: `chats/get-conversation?conversationId=${id}&pageNumber=${pgNumber}&pageSize=${pgSize}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useConversationListQuery, useGetConversationQuery } = chatApis;
