import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Text, Space } from "@mantine/core";
import { createStyles, Header, Menu, Group, Center, Burger, Container } from "@mantine/core";

const Navibar = () => {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const title = navActive ? "Close navigation" : "Open navigation";

  const MENU_LIST = [
    { text: "HAUSE", href: "/" },
    { text: "PREDIGTEN", href: "/predigten" },
    { text: "LIVE", href: "/streams/live" },
    
  ];

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"} passHref>
          
            <img
              className="navbar__logo"
              src="https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/2.jpg?alt=media&token=63222a19-3766-4d10-8387-0018c9ce900b"
              alt="Logo"
            />
          
        </Link>
        <Burger
          opened={navActive}
          onClick={() => setNavActive(!navActive)}
          title={title}
          color="#ffffff"
          className={`nav__menu-bar-two`}
          size="lg"
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
              <Link href={menu.href} passHref>
                {menu.text}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navibar;
