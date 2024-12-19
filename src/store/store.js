import { configureStore, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';  

const loadCart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
  return cartItems;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(), 
    showCart: false,
  },
  reducers: {
    addToCart(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      const stock = parseInt(localStorage.getItem(`product_stock_${id}`)) || 0;

      if (stock >= quantity) {
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ ...action.payload });
        }
        localStorage.setItem('cart_items', JSON.stringify(state.items));
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
      localStorage.setItem('cart_items', JSON.stringify(state.items));
    },
    incrementQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      const stock = parseInt(localStorage.getItem(`product_stock_${item.id}`)) || 0;

      // Periksa apakah stok cukup untuk menambah quantity dan Simpan data keranjang ke localStorage
      if (item.quantity < stock) {
        if (item) item.quantity += 1;
        localStorage.setItem('cart_items', JSON.stringify(state.items));
      } else {
        notification.error({
          message: "Stok Tidak Cukup",
          description: "Tidak bisa menambah jumlah karena stok tidak mencukupi",
          placement: "topRight",
          duration: 3,
        });
      }
    },
    decrementQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;

        // Simpan data keranjang ke localStorage
        localStorage.setItem('cart_items', JSON.stringify(state.items));
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
        
        // Update stok di localStorage
        localStorage.setItem(`product_stock_${item.id}`, newStock); 
      });

      // Hapus semua item setelah checkout
      state.items = [];

      // Simpan perubahan keranjang ke localStorage
      localStorage.setItem('cart_items', JSON.stringify(state.items));
    }
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, toggleCart, checkout } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
