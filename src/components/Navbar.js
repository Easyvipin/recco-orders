import React, { useState } from "react";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { colors } from "themes/colors";

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #21623e;
  height: 4rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5f5f5;
`;

const Links = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 700px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${(props) => (props.active ? "#f5f5f5" : "#c1c2c0")};
  text-decoration: none;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
`;

const CartIcon = styled(FaShoppingCart)`
  font-size: 1.5rem;
  color: #f5f5f5;
  cursor: pointer;
`;

const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const CartContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CartBadge = styled.span`
  background-color: ${colors.success};
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  left: -8px;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #21623e;
  color: #f5f5f5;
  right: 0;
  top: 100%;
  min-width: 120px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
`;

const DropdownItem = styled.div`
  padding: 0.3rem 0;
  cursor: pointer;
`;

const NavbarContainer = styled.div`
  width: 85vw;
  margin: auto;
  color: #c1c2c0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  height: 100%;

  @media (max-width: 1000px) {
    width: 95vw;
  }
`;

const SiteNavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
`;

const UserNavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
`;

const UserButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <SiteNavContainer>
          <Logo>Recco</Logo>
          <Links>
            <NavLink active>Store</NavLink>
            <NavLink>Orders</NavLink>
            <NavLink>Analytics</NavLink>
          </Links>
        </SiteNavContainer>
        <UserNavContainer>
          <CartContainer>
            <CartIcon />
            <CartBadge>{0}</CartBadge>
          </CartContainer>
          <UserDropdown>
            <UserButton onClick={(e) => toggleUserDropdown(e)}>
              <span>Hello, Jame</span>
              <BsChevronDown />
            </UserButton>
            <DropdownContent isOpen={isUserDropdownOpen}>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Orders</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownContent>
          </UserDropdown>
        </UserNavContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
