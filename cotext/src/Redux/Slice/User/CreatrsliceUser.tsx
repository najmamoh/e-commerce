import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../Interfaces";

// **User Interface**
export interface User {
  name: string;
  email: string;
  password: string;
}

// **Define the Expected Error Type**
interface ErrorResponse {
  errorMsg: string;
}

// **Async Thunk for Creating a User**
export const createUser = createAsyncThunk<
  User, // Success response type
  User, // Input argument type
  { rejectValue: ErrorResponse } // Rejected payload type
>(
  "postUsers/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Url}/Users/signup`, userData, {
        headers: {
          "Content-Type": "application/json", // Send data as JSON
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error creating user:", error);
      return rejectWithValue({
        errorMsg: error.response?.data?.message || error.message || "Failed to create user",
      });
    }
  }
);

// **Create Redux Slice**
const createUserSlice = createSlice({
  name: "postUsers",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMsg: "",
    data: null as User | null,
  },
  reducers: {
    resetPostUser: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMsg = "";
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg =
          (action.payload as ErrorResponse)?.errorMsg || "Failed to create user";
      });
  },
});

// **Export Actions**
export const { resetPostUser } = createUserSlice.actions;

// **Export Reducer**
export default createUserSlice.reducer;
