import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/store";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal"; 
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const updateStock = () => {
      const storedStock = parseInt(localStorage.getItem(`product_stock_${product.id}`)) || 0;
      setStock(storedStock);
    };

    updateStock();

    const interval = setInterval(updateStock, 1000); 
    
    return () => clearInterval(interval);
  }, [product.id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    const isLoggedIn = localStorage.getItem("access_token");
    if (!isLoggedIn) {
      setIsModalVisible(true); 
      return;
    }
    
    let currentStock = parseInt(localStorage.getItem(`product_stock_${product.id}`)) || 0;
    if (quantity > currentStock) {
      setIsModalVisible(true); 
      return; 
    }
  
    const cartItem = { ...product, quantity };
  
    let cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
  
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push(cartItem);
    }
  
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  
    dispatch(addToCart(cartItem));
  
  };
  

  const truncateTitle = (title) => (title.length > 15 ? `${title.substring(0, 15)}...` : title);

  return (
    <>
      <div className="cardd" onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.image} alt={product.title} />

        <div className="card-body">
          <p className="product-category">{product.category}</p>
          <h6 className="Product-title">{truncateTitle(product.title)}</h6>
          <p className="Product-price">${product.price.toFixed(2)}</p>
          <p className="Product-stock">Stock: {stock}</p>
          <button className="btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      <LoginModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default ProductCard;
