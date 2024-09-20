import { createSlice } from "@reduxjs/toolkit";

const colorModeSlice = createSlice({
  name: "colorMode",
  initialState: "light",
  reducers: {
    setColorMode: (state) => {
      return state === "light" ? "dark" : "light";
    },
  },
});

export const { setColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
