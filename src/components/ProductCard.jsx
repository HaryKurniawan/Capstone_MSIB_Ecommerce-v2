import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0); // State untuk stok produk

  // Memperbarui stok setiap kali data diubah di localStorage atau komponen di-render ulang
  useEffect(() => {
    const updateStock = () => {
      const storedStock = parseInt(localStorage.getItem(`product_stock_${product.id}`)) || 0;
      setStock(storedStock);
    };

    // Update stok pertama kali ketika komponen dimuat
    updateStock();

    // Setup listener jika ada perubahan stok (misalnya, setelah update di Cart)
    const interval = setInterval(updateStock, 1000); // Cek setiap detik (bisa disesuaikan)
    
    // Membersihkan interval ketika komponen di-unmount
    return () => clearInterval(interval);
  }, [product.id]); // Memantau perubahan berdasarkan ID produk

  const handleAddToCart = (e) => {
    e.stopPropagation();
  
    const isLoggedIn = localStorage.getItem("access_token");
    if (!isLoggedIn) {
      notification.error({
        message: "Login Required",
        description: "Please log in to add items to your cart.",
        placement: "topRight",
        duration: 3,
      });
      return;
    }
  
    // Cek stok produk sebelum menambahkannya ke keranjang
    let currentStock = parseInt(localStorage.getItem(`product_stock_${product.id}`)) || 0;
    if (quantity > currentStock) {
      notification.error({
        message: "Stok Tidak Cukup",
        description: `Hanya ada ${currentStock} produk yang tersedia.`,
        placement: "topRight",
        duration: 3,
      });
      return; // Tidak melanjutkan jika stok tidak cukup
    }
  
    // Menambahkan item ke keranjang
    dispatch(addToCart({ ...product, quantity }));

    notification.success({
      message: "Added to Cart",
      description: `${product.title} x${quantity}`,
      placement: "topRight",
      duration: 3,
    });
  };

  const truncateTitle = (title) => (title.length > 15 ? `${title.substring(0, 15)}...` : title);

  return (
    <div className="cardd" onClick={() => navigate(`/product/${product.id}`)}>
      {/* <div className="rating-badge">{product.rating.rate} ⭐</div> */}
      <img src={product.image} alt={product.title} />

      <div className="card-body">
        <p className="product-category">{product.category}</p>
        <h6 className="Product-title">{truncateTitle(product.title)}</h6>
        <p className="Product-price">${product.price.toFixed(2)}</p>
        <p className="Product-stock">Stock: {stock}</p>

        <button className="btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
