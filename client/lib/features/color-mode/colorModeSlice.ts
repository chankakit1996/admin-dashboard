import { createSlice } from "@reduxjs/toolkit";

const colorModeSlice = createSlice({
  name: "colorMode",
  initialState: "dark",
  reducers: {
    setColorMode: (state) => {
      state = state === "light" ? "dark" : "light";
      return state;
    },
  },
});

export const { setColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
