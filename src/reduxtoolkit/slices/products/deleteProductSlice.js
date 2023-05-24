import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProduct } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (body, { rejectWithValue }) => {
    try {
      const res = await deleteProduct(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const deleteProductSliceSelector = (state) => state.deleteProduct;
export const deleteProductSliceReducer = deleteProductSlice.reducer;
