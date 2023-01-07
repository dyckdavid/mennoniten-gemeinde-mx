import Link from "next/link";
import { PropsWithChildren } from 'react';

type NavItemProps = PropsWithChildren<{
  text: string;
  href: string;
  active: boolean;
}>;

const NavItem = ({ text, href, active }: NavItemProps) => {
  return (
    <Link href="/">
      {text}
    </Link>
  );
};

export default NavItem;
