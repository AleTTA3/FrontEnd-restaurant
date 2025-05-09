
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import FoodDetails from './FoodDetails';
import CartPage from './CartPage';
import Navbar from "./components/Navbar";
import Contact from './Contact';
import Register from './Register'


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // اضافه کردن به سبد (با بررسی تکراری بودن)
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // حذف آیتم


  // پاک کردن سبد
  const clearCart = () => {
    setCart([]);
  };

  // تغییر تعداد آیتم
  const updateQuantity = (id, newQuantity) => {
    setCart(prevCart =>
        prevCart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        )
    );
};
const updateMenuItemQuantity = (id, newQuantity) => {
  setCart(prevCart => {
    if (newQuantity < 1) {
      return prevCart.filter(item => item.id !== id);
    }
    return prevCart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
  });
};

const removeFromCart = (id) => {
  setCart(prevCart => prevCart.filter(item => item.id !== id));
};

  return (
    <Router>
      <div className="app-container">
      <Navbar />
      <div className="page-content">
      <Routes>
              <Route path="/" element={<Menu addToCart={addToCart} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} updateMenuItemQuantity={updateMenuItemQuantity} />} />
              <Route path="/menu" element={<Menu addToCart={addToCart} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} updateMenuItemQuantity={updateMenuItemQuantity} />} />
              <Route path="/food-details/:id" element={<FoodDetails addToCart={addToCart} updateMenuItemQuantity={updateMenuItemQuantity} removeFromCart={removeFromCart} cart={cart} />} />
              <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} updateQuantity={updateQuantity} updateMenuItemQuantity={updateMenuItemQuantity}/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />}/>
      </Routes>

      </div>
      </div>
    </Router>

  );
}
export default App;
