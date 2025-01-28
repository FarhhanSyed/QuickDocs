import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to update user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/v1/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk to update user password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/v1/user/password", passwordData, {
        withCredentials: true,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: {
      updateProfile: false,
      updatePassword: false,
    },
    error: {
      updateProfile: null,
      updatePassword: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading.updateProfile = true;
        state.error.updateProfile = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading.updateProfile = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading.updateProfile = false;
        state.error.updateProfile = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading.updatePassword = true;
        state.error.updatePassword = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading.updatePassword = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading.updatePassword = false;
        state.error.updatePassword = action.payload;
      });
  },
});

export default userSlice.reducer;
