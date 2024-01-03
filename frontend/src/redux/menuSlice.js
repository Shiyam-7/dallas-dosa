import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk("fetchItems", async () => {
  const data = await fetch("http://localhost:3000/product/all");
  return data.json();
});

const initialState = {
  items: null,
  error: false,
  loading: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default menuSlice.reducer;
