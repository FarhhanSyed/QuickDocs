import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to create a new document
export const createDocument = createAsyncThunk(
  "document/createDocument",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/documents/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data.document;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to get all documents for a user
export const getDocuments = createAsyncThunk(
  "document/getDocuments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/documents", {
        withCredentials: true,
      });
      return response.data.documents;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState: {
    documents: [],
    loading: {
      create: false,
      get: false,
    },
    error: {
      create: null,
      get: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading.create = false;
        state.documents.push(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })
      .addCase(getDocuments.pending, (state) => {
        state.loading.get = true;
        state.error.get = null;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.loading.get = false;
        state.documents = action.payload;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.loading.get = false;
        state.error.get = action.payload;
      });
  },
});

export default documentSlice.reducer;
