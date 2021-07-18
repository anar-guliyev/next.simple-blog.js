import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavbarItem } from "./components";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  height: 65px;
  width: 100%;
  backdrop-filter: blur(10px);
  margin: 0 auto;
  padding: 1rem 5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavbarUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  height: 42px;
  padding: 0 1rem;
  color: #e5eff5;
  background-color: #15171a;
  border: none;
  border-radius: 7px;
  transition: background-color 0.15s ease-in;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 500;
  line-height: 21px;
  :hover {
    background-color: #738a94;
  }
`;

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <Link href="/">
        <img
          src="/images/ghost-logo-1.svg"
          alt="logo"
          style={{ height: 40, cursor: "pointer" }}
        />
      </Link>
      <NavbarContainer>
        <nav>
          <NavbarUl>
            <NavbarItem title="Latest Posts" href="/posts" />
            <NavbarItem title="About" href="/about" />
          </NavbarUl>
        </nav>
        <Button
          onClick={() => {
            router.push("posts/new");
          }}
        >
          Create New
        </Button>
      </NavbarContainer>
    </HeaderContainer>
  );
};
