import { createSlice } from "@reduxjs/toolkit";
import initialOrderData from "../../orders.json";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: initialOrderData,
  },
  reducers: {
    changeItemStatus: (state, action) => {
      const { itemId, status } = action.payload;

      const itemIndex = state.orderData.items.findIndex(
        (item) => item.productId === itemId
      );
      if (itemIndex !== -1) state.orderData.items[itemIndex].status = status;
    },
  },
});

export const { changeItemStatus } = orderSlice.actions;
export default orderSlice.reducer;
