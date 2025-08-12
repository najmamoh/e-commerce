// src/Redux/Slice/Order/GetOrderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../Interfaces"; // Define your API base URL

// ** Order Interface **
export interface Order {
  id: number;
  customerName: string;
  items: { productId: number; quantity: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

// ** Define the Expected Error Type **
interface ErrorResponse {
  errorMsg: string;
}

// ** Async Thunk for Fetching Orders **
export const fetchOrders = createAsyncThunk<
  Order[], // Success response type (array of orders)
  void, // No input argument
  { rejectValue: ErrorResponse } // Explicitly define the rejected payload type
>(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Url}/order/orders`);  // Ensure this URL is correct
           console.log(response.data.items);
 return response.data;
      
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      return rejectWithValue({
        errorMsg: error.response?.data?.message || "Failed to fetch orders",
      });
    }
  }
);

// ** Create Redux Slice **
const GetOrderSlice = createSlice({
  name: "orders",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMsg: "",
    orders: [] as Order[], // Stores fetched orders
  },
  reducers: {
    resetOrderState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMsg = "";
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg =
          (action.payload as ErrorResponse)?.errorMsg || "Failed to fetch orders";
      });
  },
});

// ** Export Actions **
export const { resetOrderState } = GetOrderSlice.actions;

// ** Export Reducer **
export default GetOrderSlice.reducer;
