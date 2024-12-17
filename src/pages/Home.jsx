import React from 'react';
import poster1 from '../images/poster-i1.svg';
import jewelrySvg from '../images/jewelry.svg';
import menClothes from '../images/menClothes.svg';
import electro from '../images/electro.svg';
import women from '../images/women.svg';
import CopyButton from "../components/CopyButton";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-contain">

      <div className="poster-1">
        <div className="bag-kanan">
          <p>Temukan</p>
          <p className='teks-mid'>Produk terbaik</p>
          <p>anda</p>
        </div>
        <div className="bag-kiri"><img src={poster1} /></div>
      </div>

      <div className="our-products">
        <p>Our Products</p>
        <div className="products-container">
          <div className="product-box"><img src={jewelrySvg} /></div>
          <div className="product-box"><img src={menClothes} /></div>
          <div className="product-box"><img src={women} /></div>
          <div className="product-box"><img src={electro} /></div>

        </div>
      </div>

      <div className="poster2-contain">

        <div className="poster-2">
          <div className="circle"></div>
          <div className="bag-kanan2">
            <p>5$</p>
            <p className='teks-mid2'>Discount</p>
          </div>
          <div className="bag-kiri2"><CopyButton textToCopy="HaryStore" /></div>
          <div className="circle2"></div>
        </div>

      </div>
      
    </div>
    
  );
}

export default Home;
