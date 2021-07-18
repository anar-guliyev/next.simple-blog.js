import styled from "styled-components";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

const NavItem = styled.li`
  margin: 0 2.5vmin;
  opacity: 0.7;
  padding: 5px 0;
  transition: color 0.15s ease;
  color: #738a94;
  font-weight: 500;
  :hover {
    color: #15171a;
  }
`;

export const NavbarItem = ({ title, href }: Props) => {
  return (
    <NavItem>
      <Link href={href}>{title}</Link>
    </NavItem>
  );
};
