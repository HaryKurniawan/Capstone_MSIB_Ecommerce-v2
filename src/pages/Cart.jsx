import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart, toggleCart } from "../store";
import { Modal, notification } from "antd"; 
import emptyCartImage from "../images/cart.png";
import "../styles/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { items, showCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0); 

  const subTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleApplyVoucher = () => {
    if (voucherCode === "HaryStore") {
      setDiscount(0.5); 
      notification.success({
        message: "Voucher Berhasil Digunakan",
        description: "Potongan $0.5 telah diterapkan.",
      });
    } else {
      setDiscount(0);
      notification.error({
        message: "Kode Voucher Tidak Valid",
        description: "Kode voucher yang Anda masukkan tidak valid.",
      });
    }
  };

  const shippingCost = 0.8;

  const total = subTotal - discount + shippingCost;

  const cartTransform = showCart ? "translateX(0)" : "translateX(100%)";

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      Modal.confirm({
        title: "Apakah Anda yakin?",
        content: "Item ini akan dihapus dari keranjang.",
        okText: "Hapus",
        cancelText: "Batal",
        onOk: () => {
          dispatch(removeFromCart(item.id));
          notification.success({
            message: "Item Dihapus",
            description: `${item.title} telah dihapus dari keranjang.`,
          });
        },
      });
    } else {
      dispatch(decrementQuantity(item.id));
    }
  };

  const handleCheckout = () => {
    const isLoggedIn = !!localStorage.getItem("access_token");
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      items.forEach(item => {
        let stock = parseInt(localStorage.getItem(`product_stock_${item.id}`)) || 0;
  
        stock -= item.quantity;
  
        localStorage.setItem(`product_stock_${item.id}`, stock);
  
        dispatch(removeFromCart(item.id));
  
        notification.success({
          message: `${item.title} Berhasil Dibeli`,
          description: `Stok tersisa: ${stock} item.`,
        });
      });
  
      notification.success({ message: "Checkout berhasil!" });
    }
  };
  

  return (
    <div
      className="cart-container"
      style={{
        transform: cartTransform,
        transition: "transform 0.3s ease-in-out",
        zIndex: 1050,
      }}
    >

      <button
        className="btn-closee"
        onClick={() => dispatch(toggleCart())}
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faTimes} className="close-icon" />
      </button>

      <div className="cart-content">
        <h5 className="cart-title">Cart</h5>

        <div className="cart-items">
          <ul className="cart-item-list">
            {items.length > 0 ? (
              items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="item-details">
                    <h6 className="item-title">{item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}</h6>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="item-quantity">
                    <button className="quantity-btn decrement" onClick={() => handleDecrement(item)}>-</button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button className="quantity-btn increment" onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                  </div>
                </li>
              ))
            ) : (
              <div className="empty-cart">
                <img
                  src={emptyCartImage}
                  alt="Keranjang Kosong"
                  className="empty-cart-image"
                />
                <p className="empty-cart-text">
                  Keranjang Anda kosong! Yuk, mulai belanja
                </p>
                <button
                  className="empty-cart-button"
                  onClick={() => {
                    window.location.href = "./shop";
                  }}
                >
                  Belanja Sekarang
                </button>
              </div>
            )}
          </ul>
        </div>

        {items.length > 0 && (
          <div className="checkout-section">
            <div className="kode-vocher">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Masukkan kode"
              />
              <button onClick={handleApplyVoucher}>Apply</button>
            </div>

            <div className="text-container">
              <div className="left-text">
                <p>Sub total</p>
                <p>Potongan</p>
                <p>Ongkir</p>
              </div>
              <div className="right-text">
                <p>${subTotal.toFixed(2)}</p>
                <p>- ${discount.toFixed(2)}</p>
                <p>$ {shippingCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="dashed-line"></div>

            <div className="checkout-bag3">
              <div className="price-checkout">
                <p>Total :</p>
                <h5>${total.toFixed(2)}</h5>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={isLoginModalOpen}
        footer={null}
        closable={false}
        centered
      >
        <div className="modal-content">
          <h2>Anda belum login!</h2>
          <p>Silakan login terlebih dahulu untuk melanjutkan.</p>
          <button
            className="btn-login-now"
            onClick={() => {
              setIsLoginModalOpen(false); 
              window.location.href = "/login"; 
            }}
          >
            Login Sekarang
          </button>
          <button
            className="btn-close-modal"
            onClick={() => setIsLoginModalOpen(false)} 
          >
            Tutup
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
