import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
// import { rootPersistConfig } from "./rootReducer";
import { combineReducers } from "redux";
import appReducer from "./slices/app/app";
import authReducer from "./slices/auth/authSlice";
import conversationReducer from "./slices/conversation/conversation";


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,
});


const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // whitelist:[]
  // blacklist:[]
};


const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();

export { persistor, store, dispatch, useSelector, useDispatch };
