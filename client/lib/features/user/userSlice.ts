import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "63701cc1f03239b7f700000e",
    name: "Shelly",
    email: "swelbeck12@ycombinator.com",
    password: "RSjzmAjnq",
  },
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
