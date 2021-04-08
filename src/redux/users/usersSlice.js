import { createSlice } from "@reduxjs/toolkit";
import api from "common/axios";
import userData from "data/user.json";
import { useHistory } from "react-router-dom";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
  },
  reducers: {
    fetchUsers: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = "loading";
    },

    fetchUsersSuccess: (state, action) => {
      state.status = "success";
      localStorage.setItem("users", action.payload);
      localStorage.setItem("initialRequest", true);
    },
    fetchUsersFail: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchUsersSuccess } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await api.get("/0.8/?results=20");
    if (res?.data)
      dispatch(fetchUsersSuccess(JSON.stringify(res?.data?.results)));
  } catch (e) {
    return console.error(e.message);
  }
};

export default userSlice.reducer;
