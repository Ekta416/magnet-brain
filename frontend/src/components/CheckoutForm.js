

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const totalAmount = calculateTotalAmount(); 

    try {
      const response = await axios.post('http://localhost:5000/api/orders/create', {
        items: cart, 
        email: email, 
        totalAmount: totalAmount, 
      });

      console.log('Checkout initiated successfully');

      // Redirect to Stripe Checkout
      const { url } = response.data; 

      if (url) {

         window.location.href = url; 
         navigate('/success'); 

         
      } else {
        console.error('No valid URL returned from API');
        navigate('/failure'); 
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
      navigate('/failure'); 
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleCheckout} disabled={!email || cart.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutForm;