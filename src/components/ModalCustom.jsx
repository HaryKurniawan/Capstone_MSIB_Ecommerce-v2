import React, { useState } from 'react';
import "../styles//ModalCustom.css";
import ModalCustom from './ModalCustom';
import { Button } from 'antd';

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleButtonClick = () => {
    alert('Tombol diklik!');
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1>Selamat datang di Halaman Utama!</h1>
      <Button type="primary" onClick={showModal}>
        Buka Modal
      </Button>

      <ModalCustom
        open={isModalVisible} 
        onClose={handleCancel}
        image="https://via.placeholder.com/400x200"
        title="Judul Modal"
        text="Ini adalah contoh teks yang bisa disesuaikan. Anda bisa mengubah konten modal ini di berbagai halaman."
        buttonText="Tombol Kustom"  
        onButtonClick={handleButtonClick}
      />
    </div>
  );
}

export default HomePage;
