// import React, { Component } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import IconSearch from "../../assets/icons/search-icon.svg";
import Styles from "./NavSearch.module.css"

export default function NavSearch() {
  return (
    <>
      <Form inline>
        <FormControl type="text" placeholder="Search" className={`mr-sm-2 ${Styles.searchInput}`} />
        <Button variant="" className={`${Styles.btnSearch}`}>
          <img src={IconSearch} alt="Search" />
        </Button>
      </Form>
    </>
  );
}
