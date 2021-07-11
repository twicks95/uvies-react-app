import React, { Component } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavSearch from "./NavSearch/NavSearch";
import BrandLogo from "../../assets/icons/Tickitz.svg";
import styles from "./Navbar.module.css";
import UserNavigation from "./UserNavigation/UserNavigation";
import DropdownNavigation from "./DropdownNavigation/DropdownNavigation";
import { UserCircleIcon } from "@heroicons/react/outline";

class NavigationBar extends Component {
  handleSignUp = () => {
    this.props.history.push("/sign-up");
  };

  handleProfile = () => {
    this.props.history.push(`/profile?userId=${this.props.auth.data.user_id}`);
  };

  renderButton = () => {
    if (!localStorage.getItem("token")) {
      return (
        <Button className={`${styles.btnSignUp}`} onClick={this.handleSignUp}>
          Sign Up
        </Button>
      );
    } else {
      return (
        <Button
          variant="light"
          className={`p-0 ${styles.btnProfile}`}
          onClick={this.handleProfile}
        >
          {this.props.user.data.user_profile_picture ? (
            <img
              src={`${process.env.REACT_APP_API_USER_IMG_URL}/${this.props.user.data.user_profile_picture}`}
              alt="avatar"
              className={`${styles.userAvatar}`}
            />
          ) : (
            <UserCircleIcon />
          )}
        </Button>
      );
    }
  };

  leadToHomePage = () => {
    this.props.history.push("/");
  };

  render() {
    const { role } = this.props;

    return (
      <Navbar bg="light" expand="lg" className={`${styles.navigationBar}`}>
        <Navbar.Brand
          onClick={this.leadToHomePage}
          className={`${styles.navigationBrand}`}
        >
          <img src={BrandLogo} alt="Uvies Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <UserNavigation isAdmin={role} />
          </Nav>
          <Nav>
            <DropdownNavigation />
          </Nav>
          <NavSearch />
          {this.renderButton()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, null)(withRouter(NavigationBar));
