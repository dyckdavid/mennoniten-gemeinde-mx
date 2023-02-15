import { link } from "fs";
import Link from "next/link";

type Props = {
    text: string;
    link: string;
    active: boolean;
  };

const NavItem = ({ text, link, active } : Props) => {
  return (
    <Link href={"link"} legacyBehavior as={link}>
      <a className={`nav__link`}>{text}</a>
    </Link>
  );
};

export default NavItem;