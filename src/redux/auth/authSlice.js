import { createSlice } from "@reduxjs/toolkit";
import api from "common/axios";
import userData from "data/user.json";
import { useHistory } from "react-router-dom";

const initialUser = localStorage.getItem("isAuthenticated")
  ? localStorage.getItem("isAuthenticated")
  : false;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    isAuthenticated: initialUser,
  },
  reducers: {
    logIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = "loading";
    },
    logInSuccess: (state, action) => {
      state.status = "success";
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
    },
    logInFail: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logOutSuccess: (state, action) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { logInSuccess, logInFail, logOutSuccess } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const logIn = (data) => (dispatch) => {
  if (
    userData &&
    userData?.username === data?.username &&
    userData?.password === data?.password
  ) {
    dispatch(logInSuccess(data));
  } else {
    dispatch(logInFail());
  }
};

export const logOut = () => async (dispatch) => {
  setTimeout(() => {
    dispatch(logOutSuccess());
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer;

