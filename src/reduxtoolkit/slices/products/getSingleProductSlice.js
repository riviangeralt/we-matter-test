import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleProduct } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const getSingleProductThunk = createAsyncThunk(
  "products/getSingleProduct",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getSingleProduct(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getSingleProductSlice = createSlice({
  name: "getSingleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getSingleProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const getSingleProductSliceSelector = (state) => state.getSingleProduct;
export const getSingleProductSliceReducer = getSingleProductSlice.reducer;
