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

// Thunk to validate access to shared documents
export const validateAccess = createAsyncThunk(
  "document/validateAccess",
  async ({ token, pin }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/documents/validate-access",
        { token, pin },
        {
          withCredentials: true,
        }
      );
      return response.data.documents;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to generate share token for multiple documents
export const generateShareTokenForMultipleDocuments = createAsyncThunk(
  "document/generateShareTokenForMultipleDocuments",
  async ({ documentIds, accessMode, pin }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/documents/generate-share-token",
        { documentIds, accessMode, pin },
        {
          withCredentials: true,
        }
      );
      return response.data;
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
      validateAccess: false,
      generateShareToken: false,
    },
    error: {
      create: null,
      get: null,
      validateAccess: null,
      generateShareToken: null,
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
      })
      .addCase(validateAccess.pending, (state) => {
        state.loading.validateAccess = true;
        state.error.validateAccess = null;
      })
      .addCase(validateAccess.fulfilled, (state, action) => {
        state.loading.validateAccess = false;
        state.documents = action.payload;
      })
      .addCase(validateAccess.rejected, (state, action) => {
        state.loading.validateAccess = false;
        state.error.validateAccess = action.payload;
      })
      .addCase(generateShareTokenForMultipleDocuments.pending, (state) => {
        state.loading.generateShareToken = true;
        state.error.generateShareToken = null;
      })
      .addCase(generateShareTokenForMultipleDocuments.fulfilled, (state) => {
        state.loading.generateShareToken = false;
      })
      .addCase(
        generateShareTokenForMultipleDocuments.rejected,
        (state, action) => {
          state.loading.generateShareToken = false;
          state.error.generateShareToken = action.payload;
        }
      );
  },
});

export default documentSlice.reducer;
