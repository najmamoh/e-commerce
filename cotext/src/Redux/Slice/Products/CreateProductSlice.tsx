import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../Interfaces";

// **Product Interface**
export interface Product {
  name: string;
  doc: string;
  price: number;
  image: string; // Should be a URL after uploading
}

// **Define the Expected Error Type**
interface ErrorResponse {
  errorMsg: string;
}

// **Async Thunk for Creating a Product**
export const createProduct = createAsyncThunk<
  Product, // Success response type
  Product, // Input argument type
  { rejectValue: ErrorResponse } // Explicitly define the rejected payload type
>(
  "postProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('doc', productData.doc);
      formData.append("price", productData.price.toString()); // Keep as string
      formData.append('image', productData.image); 

      console.log(productData);
      console.log(formData);

      const response = await axios.post(`${Url}/products/new`, formData)
     
      return response.data;
    } catch (error: any) {
      console.error("Error creating product:", error);
      return rejectWithValue({
        errorMsg: error.response?.data?.message || "Failed to create product",
      });
    }
  }
);

// **Create Redux Slice**
const CreateProductSlice = createSlice({
  name: "postProducts",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMsg: "",
    data: null as Product | null,
  },
  reducers: {
    resetPostProduct: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMsg = "";
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg =
          (action.payload as ErrorResponse)?.errorMsg || "Failed to create product";
      });
  },
});

// **Export Actions**
export const { resetPostProduct } = CreateProductSlice.actions;

// **Export Reducer**
export default CreateProductSlice.reducer;