import { configureStore } from "@reduxjs/toolkit";
import {GetAllProductsSlice} from "./Slice/Products/GetProductsSlice";
import createProductReducer from "./Slice/Products/CreateProductSlice";
import deleteProduct from "./Slice/Products/DeleteProductSlice";
import updateProduct from "./Slice/Products/updateProductSlice";
import createuser from "./Slice/User/CreatrsliceUser";
import loginReducer from "./Slice/User/Logingslice";
import postOrders from "./Slice/Order/CreatOrderSlice";
import cart from "./Slice/cartt/creatCartslice";
import GetOrderslice from "./Slice/Order/GetOrderslice";

const store = configureStore({
  reducer: {
    getAllProducts: GetAllProductsSlice.reducer,
     createProduct: createProductReducer,    // Ensure proper naming
     deleteProduct:deleteProduct,
     updateProduct:updateProduct,
     createuser:createuser,
     auth: loginReducer, // Use a simpler, meaningful name
     postOrders: postOrders, // Orders reducer
     cart: cart, // Orders reducer
     GetOrderslice:GetOrderslice
    },
});

// Infer the `AppDispatch` type from the store
export default store;
export type RootState = ReturnType<typeof store.getState>; // For accessing the state type in components
export type AppDispatch = typeof store.dispatch; // For useDispatch typing
