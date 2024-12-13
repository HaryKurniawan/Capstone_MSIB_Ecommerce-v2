import React from "react";
import { Modal, notification } from "antd";
import warningIllustration from "../images/copyModal.svg"; 
import "../styles/loginModal.css";

const CopyLoginModal = ({ visible, onClose }) => {
  
  const handleCopyCredentials = () => {
    const username = "johnd";  
    const password = "m38rmF$"; 
    const credentials = `${username} ${password}`;
    
    navigator.clipboard.writeText(credentials).then(() => {
      notification.success({
        message: 'Berhasil Menyalin',
        description: 'Username dan Password telah disalin ke clipboard.',
        placement: 'top',
        duration: 2, 
      });
    });
  };

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
        <img src={warningIllustration} className="modal-illustration"/>
        <p className="modal-title">Pengumuman!</p>
        <p className="modal-description">Untuk login, salin username dan password dengan tombol di bawah</p>
        <button className="modal-button" onClick={handleCopyCredentials}>Salin</button>
      </div>
    </Modal>
  );
};

export default CopyLoginModal;
