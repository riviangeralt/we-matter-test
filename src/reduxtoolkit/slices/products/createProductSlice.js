import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (body, { rejectWithValue }) => {
    try {
      const res = await createProduct(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const createProductSliceSelector = (state) => state.createProduct;
export const createProductSliceReducer = createProductSlice.reducer;
