import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./slices/document";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: {
    document: documentReducer,
    user: userReducer,
  },
});

export default store;
