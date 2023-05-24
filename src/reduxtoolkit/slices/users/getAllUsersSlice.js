import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const getAllUsersThunk = createAsyncThunk(
  "Users/getAllUsers",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getAllUsers();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getAllUsersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const getAllUsersSliceSelector = (state) => state.getAllUsers;
export const getAllUsersSliceReducer = getAllUsersSlice.reducer;
