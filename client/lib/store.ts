import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterSlice from "./features/counter/counterSlice";
import colorModeSlice from "./features/color-mode/colorModeSlice";
import { apiSlice } from "./features/api/apiSlice";
import userSlice from "./features/user/userSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      counter: counterSlice,
      colorMode: colorModeSlice,
      user: userSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
