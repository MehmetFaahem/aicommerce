import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

// Export actions
export const { addItem, removeItem, updateQuantity, clearCart, setIsOpen } =
  cartSlice.actions;

// Export selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;
export const selectCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
export const selectCartTax = (state: RootState) =>
  selectCartSubtotal(state) * 0.08; // 8% tax rate
export const selectCartTotal = (state: RootState) =>
  selectCartSubtotal(state) + selectCartTax(state);

export default cartSlice.reducer;
