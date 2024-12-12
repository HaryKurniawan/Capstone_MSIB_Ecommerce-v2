import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import "../styles/Login.css";
import icon1 from "../images/google.png"; 
import icon2 from "../images/facebook.png";
import icon3 from "../images/tweet.png";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Menampilkan notifikasi info saat halaman login pertama kali dimuat
  useEffect(() => {
    notification.info({
      message: 'Masukkan username dan password',
      description: 'Masukkan huruf atau kata apapun untuk login.',
      placement: 'top',
      duration: 3, 
    });
  }, []);

  // Fungsi login untuk memverifikasi username dan password
  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch(`https://fakestoreapi.com/users`);
        const users = await response.json();

        // Cek apakah ada pengguna dengan username dan password yang sesuai
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
          // Simpan data pengguna ke localStorage
          const userData = {
            name: user.name,
            email: user.email,
            address: user.address,
            username: user.username
          };
          localStorage.setItem('access_token', 'Token_Berhasil_Login');
          localStorage.setItem('profile', JSON.stringify(userData));

          // Menampilkan notifikasi sukses dan mengarahkan pengguna ke halaman utama
          notification.success({
            message: 'Berhasil Masuk',
            description: 'Login berhasil, selamat datang!',
            placement: 'top',
            duration: 3,
          });
          navigate('/');
        } else {
          // Menampilkan notifikasi error jika username atau password salah
          notification.error({
            message: 'Gagal Login',
            description: 'Username atau password salah.',
            placement: 'top',
            duration: 3,
          });
        }
      } catch (error) {
        // Menangani error jika terjadi kesalahan dalam proses fetching
        notification.error({
          message: 'Error',
          description: 'Terjadi kesalahan saat melakukan login.',
          placement: 'top',
          duration: 3,
        });
      }
    } else {
      // Menampilkan notifikasi error jika username atau password kosong
      notification.error({
        message: 'Gagal Login',
        description: 'Masukkan username dan password yang valid.',
        placement: 'top',
        duration: 3, 
      });
    }
  };

  return (
    <div className="pages-login">
      <div className="containerr">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forgot-password">Forgot password?</div>
            <button type="submit">Login</button>
          </form>
          <div className="divider">
            <span> or continue with </span>
          </div>
          <div className="social-icons">
            <div><img src={icon1} alt="Google" className="icon-login" /></div>
            <div><img src={icon2} alt="Facebook" className="icon-login" /></div>
            <div><img src={icon3} alt="Twitter" className="icon-login" /></div>
          </div>
          <div className="register">
            Don’t have an account? <a href="#">Register</a>
          </div>
        </div>
        <div className="illustration"></div>
      </div>
    </div>
  );
};

export default Login;
