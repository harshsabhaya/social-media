import { socket } from '../../utils/socket';
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

    getConversationMerge: builder.query({
      query: (args) => {
        const { conversationId, pgNumber = 1, pgSize = '15' } = args;
        return {
          url: 'chats/get-conversation',
          method: 'GET',
          params: {
            conversationId: conversationId,
            pageNumber: pgNumber ?? 1,
            pageSize: pgSize ?? 15,
          },
        };
      },
      transformResponse: (response, meta, args) => {
        console.log('response', response, meta, args);
        return { ...response, conversationId: args?.conversationId };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache?.conversationId !== newItems?.conversationId)
          return newItems;

        currentCache?.data?.data.push(...(newItems?.data?.data || []));
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getCacheEntry }
      ) {
        try {
          await cacheDataLoaded;

          const handleUpdate = (msg) => {
            // add data only in current conversation, others will be skip
            if (arg?.conversationId !== msg?.data?.conversationId) return;

            updateCachedData((draft) => {
              draft?.data?.data.unshift(msg?.data);
            });
          };
          socket.on('getMessage', handleUpdate);
        } catch (error) {
          console.log('error', error);
        }
        await cacheEntryRemoved;
      },
    }),

    getConversation: builder.mutation({
      query: (args) => {
        const { conversationId, pgNumber = 1, pgSize = '15' } = args;
        return {
          url: 'chats/get-conversation',
          method: 'GET',
          params: {
            conversationId: conversationId,
            pageNumber: pgNumber ?? 1,
            pageSize: pgSize ?? 15,
          },
        };
      },
      async onCacheEntryAdded(
        arg,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
          getCacheEntry,
          ...obj
        }
      ) {
        try {
          await cacheDataLoaded;

          const handleUpdate = (msg) => {
            // add data only in current conversation, others will be skip
            if (arg?.conversationId !== msg?.data?.conversationId) return;

            updateCachedData((draft) => {
              draft?.data?.data.unshift(msg?.data);
            });
          };
          socket.on('getMessage', handleUpdate);
        } catch (error) {
          console.log('error', error);
        }
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const {
  useConversationListQuery,
  useGetConversationMutation,
  useGetConversationMergeQuery,
  useLazyGetConversationMergeQuery,
} = chatApis;
export default chatApis;
