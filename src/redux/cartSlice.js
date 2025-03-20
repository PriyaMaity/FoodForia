// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Each item will have { id, name, price, image, quantity, etc. }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to cart or increment its quantity if it already exists
    addItem: (state, action) => {
      const newItem = action.payload; // e.g. { id, name, price, image }
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    // Increment the quantity of a specific item
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    // Decrement quantity, and remove if quantity reaches 0
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove if quantity would go below 1
          state.items = state.items.filter((i) => i.id !== itemId);
        }
      }
    },
    // Remove an item entirely from the cart
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    // Reset cart to empty
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
