import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="navbar-brand">
          My App
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
