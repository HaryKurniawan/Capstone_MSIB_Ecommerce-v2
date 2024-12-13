import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal"; // Import the LoginModal component
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0); 
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

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
      setIsModalVisible(true); // Show modal if user isn't logged in
      return;
    }
    
    let currentStock = parseInt(localStorage.getItem(`product_stock_${product.id}`)) || 0;
    if (quantity > currentStock) {
      setIsModalVisible(true); // Show modal if stock is insufficient
      return; 
    }
  
    // Create the cart item with the selected product and quantity
    const cartItem = { ...product, quantity };
  
    // Get current cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
  
    // Add the new item to the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex >= 0) {
      // If the item already exists, update its quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Otherwise, add the new item to the cart
      cartItems.push(cartItem);
    }
  
    // Save the updated cart items back to localStorage
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  
    // Optionally, dispatch to Redux (if needed for state management)
    dispatch(addToCart(cartItem));
  
    // Optional: Notify the user that the product was added successfully
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
        onClose={() => setIsModalVisible(false)} // Close modal
      />
    </>
  );
};

export default ProductCard;
