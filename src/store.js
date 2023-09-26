import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./Containers/OrderContainer/orderSlice";

const store = configureStore({
  reducer: {
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
