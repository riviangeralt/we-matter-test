import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const updateUserThunk = createAsyncThunk(
  "Users/updateUser",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateUser(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const updateUserSliceSelector = (state) => state.updateUser;
export const updateUserSliceReducer = updateUserSlice.reducer;
