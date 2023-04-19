import { combineReducers, configureStore } from '@reduxjs/toolkit';

import chatSlice from './chat/chatSlice';
import rtkApi from './rtkApi';
import userSlice from './user-profile/userProfileThunk';

const rootReducer = combineReducers({
  [rtkApi.reducerPath]: rtkApi.reducer,
  profile: userSlice,
  chat: chatSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});
