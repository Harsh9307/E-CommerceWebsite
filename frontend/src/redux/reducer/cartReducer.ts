// Import necessary functions and types from Redux Toolkit and custom types
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

// Define the initial state for the cart
const initialState: CartReducerInitialState = {
  loading: false, // Indicates if the cart is currently being updated
  cartItems: [], // Array to hold items in the cart
  subtotal: 0, // Sum of the prices of all items in the cart
  tax: 0, // Tax amount on the cart items
  shippingCharges: 0, // Shipping charges for the cart
  discount: 0, // Discount amount applied to the cart
  total: 0, // Total amount after adding tax and shipping charges, and applying discount
  shippingInfo: {
    address: "", // Shipping address
    city: "", // Shipping city
    state: "", // Shipping state
    country: "", // Shipping country
    pinCode: "", // Shipping postal code
  },
};

// Create a slice for the cart using Redux Toolkit
export const cartReducer = createSlice({
  name: "cartReducer", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to handle adding an item to the cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true; // Set loading to true while processing

      // Find if the item already exists in the cart by its productId
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;  // If the item already exists, update it
      else state.cartItems.push(action.payload); // If the item does not exist, add it to the cart
      state.loading = false; // Set loading to false after processing
    },

    // Reducer to handle removing an item from the cart
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true; // Set loading to true while processing
      // Remove the item from the cart by filtering out the item with the matching productId
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false; // Set loading to false after processing
    },

    // Reducer to handle price calculations for the cart
    calculatePrice: (state) => {
      // Calculate the subtotal by summing up the price * quantity for each item
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal; // Set the calculated subtotal
      state.shippingCharges = state.subtotal > 1000 ? 0 : 200; // Set shipping charges based on subtotal
      state.tax = Math.round(state.subtotal * 0.18); // Calculate tax as 18% of the subtotal
      state.total = state.subtotal + state.tax + state.shippingCharges - state.discount; // Calculate total amount
    },

    // Reducer to handle applying a discount to the cart
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload; // Set the discount amount
    },

    // Reducer to handle saving shipping information
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload; // Set the shipping information
    },

    // Reducer to handle resetting the cart to its initial state
    resetCart: () => initialState, // Reset the cart to the initial state
  },
});

// Export the action creators generated by createSlice for use in components
export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;

// Export the reducer function to be used in the store
export default cartReducer.reducer;
