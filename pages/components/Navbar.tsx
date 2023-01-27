/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { Text, Space } from '@mantine/core';
import { createStyles, Header, Menu, Group, Center, Burger, Container } from '@mantine/core';



const MENU_LIST = [
  { text: "Hause", href: "/" },
  { text: "Predigten", href: "/predigten" },
  { text: "Live", href: "/live" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const title = navActive ? 'Close navigation' : 'Open navigation';

  

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"} legacyBehavior>
          <a>
            <img className="navbar__logo" src="https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/3.png?alt=media&token=492879b0-b1c2-427a-a71e-4747ed4563e6" ></img>
          </a>
        </Link>
        <Burger
      opened={navActive}
      onClick={() => setNavActive(!navActive)}
      title={title}
      color="#ffffff"
      className={`nav__menu-bar-two`}
    />

        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;