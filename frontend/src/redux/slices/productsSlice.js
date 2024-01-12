import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload)
      state.products.push(action.payload)
    }
  }
})

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
