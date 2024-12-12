import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import "../styles/ProductList.css";

const ProductList = ({ category, ratingFilter, priceFilter, searchQuery }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        data.forEach(product => {
          // Menyimpan stok default 20 jika belum ada stok yang di-set
          const stock = localStorage.getItem(`product_stock_${product.id}`) || 20;
          localStorage.setItem(`product_stock_${product.id}`, stock); // Simpan stok produk
        });
        setProducts(data);
      });
  }, []);

  let filteredProducts = products.filter((product) => {
    if (category && product.category !== category) return false;
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (ratingFilter) {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  } else if (priceFilter) {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <div className="container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <div className='no-products'>
          <p>Produk tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
