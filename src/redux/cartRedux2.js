import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart2",
  initialState: {
    products: [],
    quantity: [],
    total: 0,
  },
  reducers: {
    addProductt: (state, action) => {
      console.log(action.payload, "payload");
      state.products.push(action.payload);
      state.quantity.push(action.payload._id);
    },
    removeProduct: (state, action) => {},
    emptyCart: (state) => {},
  },
});

export const { addProductt, removeProduct, addToCartFailure, logoutUser } =
  cartSlice.actions;
export default cartSlice.reducer;
