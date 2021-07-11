import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import IconSearch from "../../../assets/icons/search-icon.svg";
import styles from "./NavSearch.module.css";

const NavSearch = (props) => {
  return (
    <>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className={`me-sm-2 ${styles.searchInput}`}
        />
        <Button variant="" className={`${styles.btnSearch}`}>
          <img src={IconSearch} alt="Search" />
        </Button>
      </Form>
    </>
  );
};

export default NavSearch;
