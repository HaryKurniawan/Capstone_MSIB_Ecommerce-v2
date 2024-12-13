import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import '../styles/About.css';
import SearchBar from '../components/SearchBar';

function About() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = import.meta.env.VITE_URL_PRODUCTS_CATEGORIES; // Mengambil URL dari .env
        const response = await fetch(url);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
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
      <div className="bag-atas-home">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />

        <div className="filter-buttons">
          <div className="dropdownn">
            <select
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Kategori</option>
              {categories.map((categoryItem, index) => (
                <option key={index} value={categoryItem}>
                  {categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => toggleFilter('rating')}
            className={activeFilter === 'rating' ? 'active' : ''}
          >
            Rating
          </button>

          <button
            onClick={() => toggleFilter('price')}
            className={activeFilter === 'price' ? 'active' : ''}
          >
            Harga
          </button>
        </div>
      </div>
      
      <div className="produk">
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

export default About;
