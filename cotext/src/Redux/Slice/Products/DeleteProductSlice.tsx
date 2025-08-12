import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../Interfaces";

// Define the expected error type
interface ErrorResponse {
  errorMsg: string;
}

// Async Thunk for Deleting a Product
export const deleteProduct = createAsyncThunk<
  string, // Success response type (ID of deleted product)
  string, // Input argument type (Product ID)
  { rejectValue: ErrorResponse } // Explicitly define rejected payload type
>(
  "deleteProducts/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${Url}/products/delete/${productId}`);
      return productId; // Return the deleted product ID
    } catch (error: any) {
      console.error("Error deleting product:", error);
      return rejectWithValue({
        errorMsg: error.response?.data?.message || "Failed to delete product",
      });
    }
  }
);

// Create Redux Slice
const DeleteProductSlice = createSlice({
  name: "deleteProducts",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMsg: "",
    deletedProductId: null as string | null,
  },
  reducers: {
    resetDeleteProduct: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMsg = "";
      state.deletedProductId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedProductId = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg =
          (action.payload as ErrorResponse)?.errorMsg || "Failed to delete product";
      });
  },
});

// Export Actions
export const { resetDeleteProduct } = DeleteProductSlice.actions;

// Export Reducer
export default DeleteProductSlice.reducer;
