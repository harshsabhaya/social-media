import rtkApi from '../rtkApi';

const authApis = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (body) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
      transformErrorResponse: (response) => response,
    }),
    signUp: builder.mutation({
      query: (body) => {
        return {
          url: '/auth/signup',
          method: 'POST',
          body: body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
      transformErrorResponse: (response) => response,
    }),
  }),
});

export const { useLogInMutation, useSignUpMutation } = authApis;
