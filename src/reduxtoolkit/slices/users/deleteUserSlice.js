import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const deleteUserThunk = createAsyncThunk(
  "Users/deleteUser",
  async (body, { rejectWithValue }) => {
    try {
      const res = await deleteUser(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const deleteUserSliceSelector = (state) => state.deleteUser;
export const deleteUserSliceReducer = deleteUserSlice.reducer;
