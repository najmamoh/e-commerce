import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../Interfaces";

const initialState = {
    successMessage: "",
    loading: false,
    error: null,
    selectedProduct: null, // Add this to store the product details
  };
  
// Make sure the `updateProduct` action is set up to handle the incoming payload
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (product: { id: number; name: string; doc: string; price: number; image: string }) => {
      const response = await fetch(`${Url}/products/update/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
  
      const updatedProduct = await response.json();
      return updatedProduct;
    }
  );
  

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product updated successfully!";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateProductSlice.reducer;
