import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TOKEN, baseUrl } from '../utils/config';
import { getCookie } from '../utils/cookiesManagement';
import em, { UNAUTHORIZED_USER } from '../utils/eventEmitter';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    if (getCookie(TOKEN)) {
      headers.set('Authorization', getCookie(TOKEN));
    }
    return headers;
  },
});

const customFetchBasedQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.meta?.response?.status === 401) {
    em.emit(UNAUTHORIZED_USER);
  }
  return result;
};

const rtkApi = createApi({
  reducerPath: 'rtkQuery',
  baseQuery: customFetchBasedQuery,
  endpoints: () => ({}),
});

export default rtkApi;
