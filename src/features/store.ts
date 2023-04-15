import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { Context, createWrapper } from "next-redux-wrapper";
import authReducer from "./slices/auth.slice";
import shoppingListReducer from "./slices/shopping-list.slice";

const IS_DEV_MODE = process.env.NODE_ENV === "development";

export const makeStore = (ctx: Context) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer,
      shoppingList: shoppingListReducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({ thunk: { extraArgument: ctx } }).concat(
        api.middleware
      );
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: IS_DEV_MODE,
});
