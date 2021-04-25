import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import NavSearch from "./NavSearch/NavSearch";
import BrandLogo from "../../assets/icons/Tickitz.svg";
import styles from "./Navbar.module.css";
import UserNavigation from "./UserNavigation/UserNavigation";
import DropdownNavigation from "./DropdownNavigation/DropdownNavigation";

import userAva from "../../assets/img/user-profile-pict.png";

const NavigationBar = (props) => {
  const { role, loginStatus } = props;

  const renderButton = () => {
    if (loginStatus === true) {
      return (
        <Button variant="light" className={`p-0 ${styles.btnProfile}`}>
          <img src={userAva} alt="avatar" className={`${styles.userAvatar}`} />
        </Button>
      );
    } else {
      return (
        <Button href="/" className={`${styles.btnSignUp}`}>
          Sign Up
        </Button>
      );
    }
  };

  return (
    <Navbar bg="light" expand="lg" className={`${styles.navigationBar}`}>
      <Navbar.Brand href="/" className={`${styles.navigationBrand}`}>
        <img src={BrandLogo} alt="Uvies Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <UserNavigation isAdmin={role} />
        </Nav>
        <Nav>
          <DropdownNavigation />
        </Nav>
        <NavSearch />
        {renderButton()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
