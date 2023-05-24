import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const getAllProductsThunk = createAsyncThunk(
  "products/getAllProducts",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getAllProducts(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllProductsSlice = createSlice({
  name: "getAllProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getAllProductsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const getAllProductsSliceSelector = (state) => state.getAllProducts;
export const getAllProductsSliceReducer = getAllProductsSlice.reducer;
