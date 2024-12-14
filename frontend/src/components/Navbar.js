import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav>
      <h1>E-Commerce</h1>
      <Link to="/cart">
        Cart ({cart.length})
      </Link>
    </nav>
  );
};

export default Navbar;
