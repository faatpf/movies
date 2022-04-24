import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "src/utils/types";

const initialState: UserInfo = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserInfo(state: UserInfo, action) {
      state.user_name = action.payload;
    },
    resetUserInfo(state: UserInfo) {
      delete state.user_name;
    },
  },
});

export const { setUserInfo, resetUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
