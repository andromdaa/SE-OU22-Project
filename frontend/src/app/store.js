import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import {persistReducer, persistStore} from "redux-persist";
import thunk from 'redux-thunk';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [ thunk ]
});

export const persistor = persistStore(store);

