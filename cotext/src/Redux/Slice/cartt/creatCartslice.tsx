import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../../../Interfaces';

// Define the types for the cart items
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Define the types for the slice state
interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  isError: boolean;
  errorMsg: string | null;
}

// API call to fetch the cart
export const fetchCart = createAsyncThunk<CartItem[], void, { rejectValue: string }>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Url}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items; // Assuming the response is directly the array of cart items
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

// API call to add item to the cart
export const addToCartAPI = createAsyncThunk<CartItem, { id: number; productId: string; name: string; price: number; image: string }, { rejectValue: string }>(
  'cart/addToCart',
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${Url}/cart/add`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Assuming the API returns the updated cart item
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
    }
  }
);

// API call to remove item from the cart
export const removeFromCartAPI = createAsyncThunk<{ id: number }, number, { rejectValue: string }>(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${Url}/cart/remove/${productId}`);
      return response.data; // Assuming the API returns the removed item info or just an ID
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove item from cart");
    }
  }
);

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  isError: false,
  errorMsg: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch cart
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload; // Assuming the API returns an array of cart items
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    });

    // Add to cart
    builder.addCase(addToCartAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCartAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems.push(action.payload); // Assuming the API returns the updated cart item
    });
    builder.addCase(addToCartAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    });

    // Remove from cart
    builder.addCase(removeFromCartAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCartAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id); // Remove item by ID
    });
    builder.addCase(removeFromCartAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
