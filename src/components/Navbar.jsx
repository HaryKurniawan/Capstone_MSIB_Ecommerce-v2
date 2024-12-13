import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store";
import "../styles/navbar.css";
import logo from "../images/Vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBagShopping, faUser, faRightToBracket, faCartShopping, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal"; // Impor komponen modal

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("access_token");
  const cartCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleCartClick = () => {
    if (isLoggedIn) {
      dispatch(toggleCart());
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const getTimeGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    if (hours >= 17 && hours < 21) return "Good Evening";
    return "Good Night";
  };

  if (location.pathname === "/login") {
    return null;
  }

  const showNavbarBottom = !location.pathname.startsWith("/product/");
  const isBackButtonPage = location.pathname.startsWith("/product/");
  const hideNavbarLinks = location.pathname.startsWith("/product/");
  const hideNavbarShadow = location.pathname.startsWith("/product/");

  return (
    <>
      <nav className={`navbar-top ${hideNavbarShadow ? "no-shadow" : ""}`}>
        <div className="navbar-logo">
          {isBackButtonPage ? (
            <button className="btn-back" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            </button>
          ) : (
            <div className="textt-navbar">
              <p className="name-navbar">Hi</p>
              <p className="time-navbar">{getTimeGreeting()}</p>
            </div>
          )}
        </div>

        <div className="navbar-links-cart">
          <div className="navbar-links">
            {!hideNavbarLinks && (
              <>
                <Link to="/" className={isActive("/") ? "active" : ""}>
                  Home
                </Link>
                <Link to="/about" className={isActive("/about") ? "active" : ""}>
                  About
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/profile"
                    className={isActive("/profile") ? "active" : ""}
                  >
                    Profile
                  </Link>
                )}
                {!isLoggedIn && (
                  <button
                    className="btn-login"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <button className="btn-cart" onClick={handleCartClick}>
          <FontAwesomeIcon className="icon-cart" icon={faCartShopping} />
          {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
        </button>
      </nav>

      {showNavbarBottom && (
        <nav className="navbar-bottom">
          <div className="navbar-links">
            <Link to="/" className={isActive("/") ? "active" : ""}>
              <FontAwesomeIcon icon={faHome} className="fa-icon" />
              {isActive("/") && <span> Home</span>}
            </Link>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>
              <FontAwesomeIcon icon={faBagShopping} className="fa-icon" />
              {isActive("/about") && <span> Shop</span>}
            </Link>
            {isLoggedIn && (
              <Link to="/profile" className={isActive("/profile") ? "active" : ""}>
                <FontAwesomeIcon icon={faUser} className="fa-icon" />
                {isActive("/profile") && <span> Profile</span>}
              </Link>
            )}
            {!isLoggedIn && (
              <button
                className="btn-login"
                onClick={() => navigate("/login")}
              >
                <FontAwesomeIcon icon={faRightToBracket} className="logout-icon" />
              </button>
            )}
          </div>
        </nav>
      )}

      <LoginModal visible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
}

export default Navbar;
