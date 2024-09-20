import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import colorModeSlice from "./features/color-mode/colorModeSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      colorMode: colorModeSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
