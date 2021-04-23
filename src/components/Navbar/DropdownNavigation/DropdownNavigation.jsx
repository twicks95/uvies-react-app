import React from "react";
import { NavDropdown } from "react-bootstrap";
import styles from "./DropdownNavigatioin.module.css"

const DropdownNavigation = (props) => {
    return (
      <>
        <NavDropdown title="Location" id="location" className={`${styles.dropdownButton}`}>
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </>
    );
}

export default DropdownNavigation;
