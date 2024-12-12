// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';  // Pastikan Anda sudah mengimpor 'notification' dari 'antd'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    showCart: false,
  },
  reducers: {
    addToCart(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      // Ambil stok dari localStorage
      const stock = parseInt(localStorage.getItem(`product_stock_${id}`)) || 0;
      
      // Periksa apakah stok mencukupi
      if (stock >= quantity) {
        if (existingItem) {
          existingItem.quantity += quantity; 
        } else {
          state.items.push({ ...action.payload });
        }
      } else {
        notification.error({
          message: "Stok Tidak Cukup",
          description: "Stok produk ini tidak mencukupi untuk jumlah yang Anda pilih.",
          placement: "topRight",
          duration: 3,
        });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    incrementQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      const stock = parseInt(localStorage.getItem(`product_stock_${item.id}`)) || 0;
      
      // Periksa apakah stok cukup untuk menambah quantity
      if (item.quantity < stock) {
        if (item) item.quantity += 1;
      } else {
        notification.error({
          message: "Stok Tidak Cukup",
          description: "Tidak bisa menambah jumlah karena stok tidak mencukupi.",
          placement: "topRight",
          duration: 3,
        });
      }
    },
    decrementQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    checkout(state) {
      // Kurangi stok setiap produk yang dibeli
      state.items.forEach(item => {
        const stock = parseInt(localStorage.getItem(`product_stock_${item.id}`)) || 0;
        const newStock = stock - item.quantity;
        localStorage.setItem(`product_stock_${item.id}`, newStock); // Update stok di localStorage
      });

      // Hapus semua item setelah checkout
      state.items = [];
    }
  },
});

// Ekspor aksi dari slice
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, toggleCart, checkout } = cartSlice.actions;

// Ekspor store sebagai default export
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
