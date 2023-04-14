import rtkApi from '../rtkApi';

const userPost = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserPost: builder.query({
      query: (pageNumber = 1, pageSize = 5) => {
        return {
          url: `/posts/get-feed-post?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetUserPostQuery } = userPost;
