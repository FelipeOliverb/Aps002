import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Replace with your logo path

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="site-name">Meu Site</span> {/* Replace with your site name */}
      </div>
      <ul className="nav-tabs">
        <li>
          <Link to="/inicio" className="nav-link">Inicio</Link>
        </li>
        <li>
          <Link to="/bd" className="nav-link">BD</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;