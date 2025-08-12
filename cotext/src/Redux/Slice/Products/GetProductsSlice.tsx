import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, errorMsg } from "../../../Interfaces";
import { data } from "react-router-dom";

// Define the product data structure
interface Product {
    name: string;
    doc: string;
    price: number;
    image: string;

}

// Define the initial state
const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMsg: "",
    data: [] as Product[], // Array of Product objects
};

// Async thunk to fetch all products
export const getAllProducts = createAsyncThunk<
    Product[],
    void,
    { rejectValue: string }
>("getAllProducts", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${Url}/products/get`);

        return res.data.result;


    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.message || errorMsg);
        }
        return rejectWithValue(errorMsg);
    }

});



// Create the slice
export const GetAllProductsSlice = createSlice({
    name: "getAllProducts",
    initialState,
    reducers: {
        resetProducts: () => initialState, // Reset state to initial
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.errorMsg = "";
                state.data = [];
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload; // Store fetched products in state
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMsg = action.payload as string;
            });
    },
});

// Export the reset action
export const { resetProducts } = GetAllProductsSlice.actions;

// Export the reducer
// export default GetAllProductsSlice;

