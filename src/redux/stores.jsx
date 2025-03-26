import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"; // Import authentication slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth reducer
  },
});

export default store;
