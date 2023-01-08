import Link from "next/link";

type Props = {
    text: string;
    href: string;
    active: boolean;
  };

const NavItem = ({ text, href, active } : Props) => {
  return (
    <Link href={"href"} legacyBehavior as={href}>
      <a className={`nav__link`}>{text}</a>
    </Link>
  );
};

export default NavItem;