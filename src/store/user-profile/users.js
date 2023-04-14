import rtkApi from '../rtkApi';

const userPost = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (pageNumber = 1, pageSize = 5) => {
        return {
          url: 'users/get-all-users?pageNumber=&pageSize=',
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAllUserQuery } = userPost;
