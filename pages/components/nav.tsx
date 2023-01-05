/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Image } from '@mantine/core';
import { Burger } from '@mantine/core';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';

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
          <Burger
          className="navbar-menu-toggle"
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
    />
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
