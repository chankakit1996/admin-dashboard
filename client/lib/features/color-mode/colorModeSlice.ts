import { createSlice } from "@reduxjs/toolkit";

const colorModeSlice = createSlice({
  name: "colorMode",
  initialState: {
    mode: "dark",
  },
  reducers: {
    setColorMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
