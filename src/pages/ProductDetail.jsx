import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/store";
import axios from "axios";  
import "../styles/ProductDetail.css";
import { Modal, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "../components/LoginModal"; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [stock, setStock] = useState(0);
  const [loginModalVisible, setLoginModalVisible] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/products/${id}`; 
        const response = await axios.get(url);
        setProduct(response.data);

        const storedStock = parseInt(localStorage.getItem(`product_stock_${id}`)) || 0;
        setStock(storedStock);
      } 
        catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    const interval = setInterval(() => {
      const updatedStock = parseInt(localStorage.getItem(`product_stock_${id}`)) || 0;
      setStock(updatedStock);
    }, 1000);

    return () => clearInterval(interval);
  }, [id]);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("access_token");

    if (isLoggedIn) {
      dispatch(addToCart({ ...product, quantity }));
      notification.success({
        description: "Berhasil menambahkan ke keranjang!",
        placement: "topRight",
      });
      setIsModalVisible(false);
    } else {
      setLoginModalVisible(true);
    }
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => quantity > 1 && setQuantity((prev) => prev - 1);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <div className="photo-product">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="bag-bawah">
        <h1>{product.title}</h1>

        <div className="rating-stock">
          <p className="stock">Stock: {stock}</p>
          {product.rating && (
            <p className="teks-rating">
              <FontAwesomeIcon icon={faStar} className="star-rating" />{" "}
              {product.rating.rate} / 5
            </p>
          )}
        </div>

        <p className="deskripsi">{product.description}</p>

        <div className="priceBtn">
          <h5>${product.price.toFixed(2)}</h5>
          <button className="btn-addtocart" onClick={() => setIsModalVisible(true)}>
            Add to Cart
          </button>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        closable={false}
      >
        <div className="quantity-control-contain">
          <p>Jumlah</p>
          <div className="quantity-control">
            <button className="custom-button" onClick={handleDecrement}>
              -
            </button>
            <span>{quantity}</span>
            <button className="custom-button" onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
        <button className="btn-modal" onClick={handleAddToCart}>
          Confirm Add to Cart
        </button>
      </Modal>

      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)} 
      />
    </div>
  );
};

export default ProductDetail;
