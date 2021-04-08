import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer
  },
});
