import React from 'react';
import { Modal, Typography } from 'antd';
import "../styles/ProfileModals.css";

const { Text } = Typography;

const ProfileModals = ({
  isHalfModalVisible,
  isLogoutModalVisible,
  onCloseHalfModal,
  onConfirmLogout,
  onCancelLogout,
}) => (
  <>
    <Modal
      title="About"
      open={isHalfModalVisible}
      onCancel={onCloseHalfModal}
      footer={null}
      centered
      styles={{
        body: { height: '70vh' }
      }}
    >
      <p className='deskripsi'>Website ini adalah percobaan platform e-commerce yang mengintegrasikan Fake Store API untuk menyediakan berbagai produk secara virtual. Di website ini, Anda dapat mencoba beberapa fitur seperti: <br /><br />
      Pencarian Produk,Filter Produk,Kategori Produk,Detail Produk Modal,Menambah ke Keranjang,Tambah Kuantitas dan kode vocher <br /><br />
      <b>Penggunaan Website </b><br /><br />

      1. Anda dapat login dengan memasukkan informasi apa saja (pastikan untuk mengisi kolom tersebut) <br /><br />
      2. Cobalah kode voucher HARYSTORE untuk mendapatkan diskon saat berbelanja.</p>
    </Modal>

    <Modal
      title="Konfirmasi Logout"
      open={isLogoutModalVisible}
      onOk={onConfirmLogout}
      onCancel={onCancelLogout}
      okText="Ya"
      cancelText="Tidak"
      centered
    >
      <Text>Apakah Anda yakin ingin logout?</Text>
    </Modal>
  </>
);

export default ProfileModals;
