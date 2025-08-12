import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../Interfaces";


export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: { 
      customerName: string; 
      products: { productId: string; quantity: number; }[]; 
      totalAmount: number; 
      status: "pending" | "confirmed" | "shipped" | "delivered"; 
  }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${Url}/Order/new`, orderData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Order Failed");
    }
  }
);


const OrderSlice = createSlice({
    name: "orders",
    initialState: { isLoading: false, isError: false, isSuccess: false, errorMsg: null, order: null },
    reducers: { resetOrderState: (state) => { state.isLoading = false; state.isError = false; state.isSuccess = false; state.errorMsg = null; state.order = null; } },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => { state.isLoading = true; })
            .addCase(createOrder.fulfilled, (state, action) => { state.isLoading = false; state.isSuccess = true; state.order = action.payload; })
            .addCase(createOrder.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.errorMsg = action.payload as string; });
    },
});

export const { resetOrderState } = OrderSlice.actions;
export default OrderSlice.reducer;
