import React from "react";
import { Modal } from "antd";
import warningIllustration from "../images/login-now.svg"; 
import { useNavigate } from "react-router-dom";
import "../styles/loginModal.css";


const LoginModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onClose}
      centered
      className="custom-modal"
      width={300}
    >
      <div className="modal-content">
        <img
          src={warningIllustration}
          alt="Warning"
          className="modal-illustration"
        />
        <p className="modal-title">Ups!</p>
        <p className="modal-description">
          Kamu belum login. Yuk, login dulu supaya bisa buka cart!
        </p>
        <button className="modal-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
