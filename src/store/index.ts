// redux
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import usersReducer from "./usersSlice";

/* persist config with WHITELIST */
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["users"],
};

const reducer = combineReducers({
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

export default store;
