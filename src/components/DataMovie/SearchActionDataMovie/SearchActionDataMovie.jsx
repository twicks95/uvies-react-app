import React from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import styles from "./SearchActionDataMovie.module.css";

const SearchActionDataMovie = (props) => {
  const { handleRequestGet, handleChangeInputSearch, searchKeyword } = props;
  // console.log(props)
  return (
    <div className={`d-flex align-items-center ${styles.searchAction}`}>
      <DropdownButton
        variant="outline-secondary"
        title="sort"
        id="sort"
        className={`mr-3`}
      >
        <Dropdown.Item onClick={(e) => handleRequestGet(e)}>
          Show All
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(e) => handleRequestGet(e, `&sort=movie_name ASC`)}
        >
          By Name
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(e) => handleRequestGet(e, `&sort=movie_release_date DESC`)}
        >
          By Release Date
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(e) => handleRequestGet(e, `&sort=movie_created_at DESC`)}
        >
          By Currently Added
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item disabled>Uvies App</Dropdown.Item>
      </DropdownButton>
      <form className={`m-0`}
        onSubmit={(e) => handleRequestGet(e, `&searchByName=${searchKeyword}`)}
      >
        <Form.Control
          type="text"
          placeholder="Search movie name ... "
          onChange={(e) => handleChangeInputSearch(e)}
        />
        <Button type="submit" className={`d-none`}></Button>
      </form>
    </div>
  );
};

export default SearchActionDataMovie;
