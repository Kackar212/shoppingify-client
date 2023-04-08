import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../common/interfaces/user.interface";
import { RootState } from "../store";
import { login } from "../api";
import { HYDRATE } from "next-redux-wrapper";

interface Auth {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: Auth = {
  isLoggedIn: false,
  user: null,
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
    builder.addCase(
      createAction<RootState>(HYDRATE),
      (state, { payload: { auth } }) => {
        return { ...state, ...auth };
      }
    );
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
