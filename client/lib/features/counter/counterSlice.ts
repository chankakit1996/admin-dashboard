import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncIncrement.pending, () => {
        console.log("asyncIncrement pending");
      })
      .addCase(
        asyncIncrement.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      );
  },
});

// For more information about createAsyncThunk, see https://redux-toolkit.js.org/api/createAsyncThunk
// specifically cancellation
export const asyncIncrement = createAsyncThunk(
  "counter/asyncIncrement",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
