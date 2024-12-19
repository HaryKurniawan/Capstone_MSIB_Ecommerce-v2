import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import '../styles/About.css';
import SearchBar from '../components/SearchBar';

function Shop() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/products/categories`;
        const response = await fetch(url);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Eror fetching kategori: ", error);
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


  return (
    <div className="home">
      <div className="top-home">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}  
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

          <button onClick={() => toggleFilter('rating')} className={activeFilter === 'rating' ? 'active' : ''} >Rating</button>

          <button onClick={() => toggleFilter('price')} className={activeFilter === 'price' ? 'active' : ''}> Harga </button>

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

export default Shop;
