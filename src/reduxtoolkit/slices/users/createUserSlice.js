import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "../../../api-client";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const createUserThunk = createAsyncThunk(
  "products/createUser",
  async (body, { rejectWithValue }) => {
    try {
      const res = await createUser(body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const createUserSliceSelector = (state) => state.createUser;
export const createUserSliceReducer = createUserSlice.reducer;
