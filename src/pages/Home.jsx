import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar'; 
import poster1 from '../images/poster-i1.svg';
import CopyButton from "../components/CopyButton";
import "../styles/Home.css";


function Home() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);  
  const [activeFilter, setActiveFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const sortedProducts = data.sort((a, b) => b.rating.rate - a.rating.rate);
        setTopRatedProducts(sortedProducts.slice(0, 5)); 
      })
      .catch((error) => console.error("Error fetching products: ", error));
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const toggleFilter = (filterType) => {
    setActiveFilter(activeFilter === filterType ? '' : filterType);
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="home">
    
    <SearchBar 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      handleSearch={handleSearch} 
    />

    <div className="poster-1">
      <div className="bag-kanan">
        <p>Temukan</p>
        <p className='teks-mid'>Produk terbaik</p>
        <p>anda</p>
      </div>
        
      <div className="bag-kiri">
        <img src={poster1} />
      </div>
    </div>

    <div className="our-products">
      <p>Our Products</p>
      <div className="products-container">
        <div className="product-box">Ketegori 1</div>
        <div className="product-box">Ketegori 2</div>
        <div className="product-box">Ketegori 4</div>
        <div className="product-box">Ketegori 5</div>
        <div className="product-box">Ketegori 3</div>
      </div>
    </div>

    <div className="poster-2">
      <div className="circle"></div>
      <div className="bag-kanan2">
        <p>5$</p>
        <p className='teks-mid2'>Discount</p>
      </div>
        
      <div className="bag-kiri2"><CopyButton textToCopy="HaryStore" /></div>

      <div className="circle2"></div>

    </div>

    <div className="category-products">
      <ProductList
        category={category}
        ratingFilter={activeFilter === 'rating'}
        priceFilter={activeFilter === 'price'}
        searchQuery={searchQuery}
      />
    </div>
    </div>
  );
}

export default Home;
