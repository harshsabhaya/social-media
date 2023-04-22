import { combineReducers, configureStore } from '@reduxjs/toolkit';

import rtkApi from './rtkApi';
import userSlice from './user-profile/userProfileThunk';

const rootReducer = combineReducers({
  [rtkApi.reducerPath]: rtkApi.reducer,
  profile: userSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});
