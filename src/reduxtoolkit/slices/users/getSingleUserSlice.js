import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleUser } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const getSingleUserThunk = createAsyncThunk(
  "Users/getSingleUser",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getSingleUser(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getSingleUserSlice = createSlice({
  name: "getSingleUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getSingleUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const getSingleUserSliceSelector = (state) => state.getSingleUser;
export const getSingleUserSliceReducer = getSingleUserSlice.reducer;
