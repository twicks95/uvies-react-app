import React, { Component } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import NavSearch from "./NavSearch/NavSearch";
import BrandLogo from "../../assets/icons/Tickitz.svg";
import Styles from "./Navbar.module.css";
import UserNavigation from "./UserNavigation/UserNavigation";
import DropdownNavigation from "./DropdownNavigation/DropdownNavigation";

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className={`${Styles.navigationBar}`}>
        <Navbar.Brand href="/" className={`${Styles.navigationBrand}`}>
          <img src={BrandLogo} alt="Uvies Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <UserNavigation />
          </Nav>
          <Nav>
            <DropdownNavigation />
          </Nav>
          <NavSearch />
          <Button href="/" className={`${Styles.btnSignUp}`}>
            Sign Up
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
