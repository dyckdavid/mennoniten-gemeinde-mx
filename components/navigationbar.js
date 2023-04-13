import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const NewNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          LOGO
        </Link>
      </div>
      <div className={styles.menuButton} onClick={toggleMenu}>
        &#9776;
      </div>
      <div
        className={styles.menu}
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '1rem',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#003cff',
          padding: '1rem',
        }}
      >
        <Link href="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link href="/about" onClick={toggleMenu}>
          About
        </Link>
        <Link href="/services" onClick={toggleMenu}>
          Services
        </Link>
        <Link href="/contact" onClick={toggleMenu}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NewNavbar;
