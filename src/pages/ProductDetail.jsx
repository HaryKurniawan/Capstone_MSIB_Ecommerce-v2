import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import "../styles/ProductDetail.css";
import { Modal, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("access_token");

    if (isLoggedIn) {
      dispatch(
        addToCart({ ...product, quantity })
      );
      notification.success({
        description: "Berhasil menambahkan ke keranjang!",
        placement: "topRight",
      });
      setIsModalVisible(false);
    } else {
      notification.warning({
        message: "Peringatan",
        description: "Silakan login terlebih dahulu untuk menambah produk.",
        placement: "topRight",
      });
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
        {product.rating && (
          <p>
            <FontAwesomeIcon icon={faStar} className="star-rating" />{" "}
            {product.rating.rate} / 5 ({product.rating.count} reviews)
          </p>
        )}
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
    </div>
  );
};

export default ProductDetail;
