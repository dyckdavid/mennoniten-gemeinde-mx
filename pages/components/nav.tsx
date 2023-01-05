/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from '@mantine/core';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <Image
        radius="xs"
        width={80}
        height={80}
        src="http://mennonitengemeinde.mx/2.jpg"
        alt="MG"
        withPlaceholder
      />
        </div>
        <div className="navbar-menu">
          <button onClick={() => setMenuOpen(!menuOpen)} className="navbar-menu-toggle">
            <FontAwesomeIcon icon="bars" />
          </button>
          <div className={`navbar-menu-items ${menuOpen ? 'open' : ''}`}>
            <a href="#" className="navbar-menu-item">Home</a>
            <a href="#" className="navbar-menu-item">About</a>
            <a href="#" className="navbar-menu-item">Contact</a>
            <a href="#" className="navbar-menu-item">Blog</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
