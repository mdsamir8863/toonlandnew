import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productsId = state.products.map((item) => item._id);
      if (!productsId.includes(action.payload._id)) {
        state.products.push(action.payload);
        // state.total += action.payload.price || 0;
        state.quantity.push(action.payload._id);
        const totalArr = state.products.map((item) => item.price);
        state.total = totalArr.reduce(function (x, y) {
          return x + y;
        }, 0);
      } else alert("Product is already added");
    },

    removeProduct: (state, action) => {
      const itemId = action.payload._id;
      state.products = state.products.filter((item) => item._id !== itemId);
      state.quantity = state.products.filter((item) => item._id !== itemId);
      const totalArr = state.products.map((item) => item.price);
      state.total = totalArr.reduce(function (x, y) {
        return x + y;
      }, 0);
    },

    emptyCart: (state, action) => {
      state.products = [];
      state.quantity = [];
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
