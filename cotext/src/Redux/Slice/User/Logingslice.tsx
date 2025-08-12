import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../Interfaces";

// **User Interface**
export interface User {
  name: string;
  email: string;
  role?: string; // Add role here
}

// **Login Credentials Interface**
interface LoginCredentials {
  email: string;
  password: string;
}

// **Define the Expected Error Type**
interface ErrorResponse {
  errorMsg: string;
}

// **Async Thunk for Logging In a User**
export const loginUser = createAsyncThunk<
  { user: User; token: string }, // Success response type
  LoginCredentials,              // Input argument type
  { rejectValue: ErrorResponse } // Rejected payload type
>(
  "postUsers/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Url}/Users/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response); // Check the structure of the full response
      const user: User = { email: response.data.user.email, name: response.data.user.name };
      const token = response.data.token;
      console.log(response);
      
      return { user, token }; // Returning user and token as expected
    } catch (error: any) {
      console.error("Error logging in:", error);
      return rejectWithValue({
        errorMsg: error.response?.data?.message || error.message || "Failed to log in",
      });
    }
  }
);

// **Create Redux Slice**
const loginUserSlice = createSlice({
  name: "postUsers",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMsg: "",
    data: null as User | null,
    token: null as string | null,
  },
  reducers: {
    resetLoginUser: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMsg = "";
      state.data = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.user;
        state.token = action.payload.token;
        console.log("Login success:", action.payload); // Check the payload on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg =
          (action.payload as ErrorResponse)?.errorMsg || "Failed to log in";
        console.log("Login failed:", action.payload); // Check the error on failed login
      });
  },
});

// **Export Actions**
export const { resetLoginUser } = loginUserSlice.actions;

// **Export Reducer**
export default loginUserSlice.reducer;
