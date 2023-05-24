import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProduct } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateProduct(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const updateProductSliceSelector = (state) => state.updateProduct;
export const updateProductSliceReducer = updateProductSlice.reducer;
