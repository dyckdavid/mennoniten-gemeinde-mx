import React, { useState } from 'react';
import { Image } from '@mantine/core';
import { Burger } from '@mantine/core';

function Navbar() {
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Burger
          color="white"
          className="navbar-menu-toggle"
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          title={title}
        />
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
          <div className={`navbar-menu-overlay ${opened ? 'open' : ''}`}>
            <div className="navbar-menu-items">
              <a href="#" className="navbar-menu-item">
                Hause
              </a>
              <a href="#" className="navbar-menu-item">
                Predigten
              </a>
              <a href="#" className="navbar-menu-item">
                Live
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
