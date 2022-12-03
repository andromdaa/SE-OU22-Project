import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import {persistReducer, persistStore} from "redux-persist";
import thunk from 'redux-thunk';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'


// config for persistent data even on reload
const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

// create redux store for global state
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [ thunk ]
});

export const persistor = persistStore(store);

