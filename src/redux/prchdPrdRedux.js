import { createSlice } from "@reduxjs/toolkit";

const prchdPrdSlice = createSlice({
  name: "prchdPrd",
  initialState: {
    products: [],
    quantity: [],
    total: 0,
  },
  reducers: {
    updatePrchdPrd: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { updatePrchdPrd } = prchdPrdSlice.actions;
export default prchdPrdSlice.reducer;
