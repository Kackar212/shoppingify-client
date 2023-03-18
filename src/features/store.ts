import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { createWrapper } from "next-redux-wrapper";

const IS_DEV_MODE = process.env.NODE_ENV === "development";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(api.middleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: IS_DEV_MODE,
});
