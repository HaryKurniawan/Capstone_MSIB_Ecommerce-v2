import React from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
// import ProductList from './components/ProductList';

const App = () => {
  return (
    <div>
      <Navbar />
      <Cart />
      {/* <ProductList /> */}
    </div>
  );
};

export default App;