import React, { Component } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLinkDropdown from "./NavDropdown";
import NavSearch from "./NavSearch";
import BrandLogo from "../../assets/icons/Tickitz.svg";
import Styles from "./Navbar.module.css";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isLogin: false,
    };
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" className={`${Styles.navigationBar}`}>
        <Navbar.Brand href="/" className={`${Styles.navigationBrand}`}>
          <img src={BrandLogo} alt="Uvies Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className={`${Styles.menu}`}>
              Movies
            </Link>
            <Link to="/" className={`${Styles.menu}`}>
              Cinemas
            </Link>
            <Link to="/" className={`${Styles.menu}`}>
              Buy Ticket
            </Link>
          </Nav>
          <Nav>
            <NavLinkDropdown />
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
