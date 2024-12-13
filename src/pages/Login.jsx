import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import icon1 from "../images/google.png"; 
import icon2 from "../images/facebook.png";
import icon3 from "../images/tweet.png";
import CopyLoginModal from '../components/CopyLoginModal'; // Import modal baru

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk mengontrol visibilitas modal
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalVisible(true); // Menampilkan modal saat komponen pertama kali dimuat
  }, []);

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch(`https://fakestoreapi.com/users`);
        const users = await response.json();

        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
          const userData = {
            name: user.name,
            email: user.email,
            address: user.address,
            username: user.username
          };
          localStorage.setItem('access_token', 'Token_Berhasil_Login');
          localStorage.setItem('profile', JSON.stringify(userData));

          setIsModalVisible(true); // Menampilkan modal sukses login
          navigate('/');
        } else {
          setIsModalVisible(true); // Menampilkan modal gagal login
        }
      } catch (error) {
        setIsModalVisible(true); // Menampilkan modal error
      }
    } else {
      setIsModalVisible(true); // Menampilkan modal input kosong
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

      {/* Menampilkan CopyLoginModal */}
      <CopyLoginModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)} 
      />
    </div>
  );
};

export default Login;
