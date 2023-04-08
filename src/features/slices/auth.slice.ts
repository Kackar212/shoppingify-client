import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../common/interfaces/user.interface";
import { RootState } from "../store";
import { login } from "../api";

interface Auth {
  isLoggedIn: boolean;
  user: User | null;
}

const user = JSON.parse(localStorage.getItem("user") || "null");
const initialState: Auth = {
  isLoggedIn: !!user,
  user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(_state, { payload: user }: PayloadAction<User>) {
      return { isLoggedIn: true, user };
    },
    signout() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      login.matchFulfilled,
      (state, { payload: { data: user } }) => {
        state.isLoggedIn = true;
        state.user = user;
      }
    );
  },
});

export const { signin, signout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
