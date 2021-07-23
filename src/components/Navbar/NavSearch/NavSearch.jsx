import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormControl } from "react-bootstrap";
import IconSearch from "../../../assets/icons/search-icon.svg";
import styles from "./NavSearch.module.css";
import axiosApiInstances from "../../../utils/axios";

const NavSearch = (props) => {
  const [show, setShow] = useState(false);
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    !keyword && setResult([]);
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword) {
      axiosApiInstances.get(`movie?searchByName=${keyword}`).then((res) => {
        setResult(res.data.data);
      });
    } else {
      setResult([]);
    }
  };

  const handleClickList = ({ movie_id }) => {
    setKeyword("");
    setResult([]);
    const urlPath = props.location.pathname.split("/");
    if (urlPath.includes("movie") && urlPath.includes("detail")) {
      props.handleSetMovieId(movie_id);
    }
    props.history.push(`/movie/detail/${movie_id}`);
  };

  return (
    <>
      <Form className={styles.searchGroup} onSubmit={(e) => handleSearch(e)}>
        <FormControl
          type="text"
          placeholder="Search movie..."
          value={keyword}
          className={`me-2 shadow-none ${styles.searchInput} ${
            show && styles.show
          }`}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          variant="light"
          className={`shadow-none ${styles.btnSearch}`}
          onClick={() =>
            !show ? setShow(true) : (setShow(false), setResult([]))
          }
        >
          <img src={IconSearch} alt="Search" />
        </Button>
        {result.length > 0 && (
          <div className={styles.searchResult}>
            {result.map((item, index) => (
              <span
                className={styles.list}
                title={item.movie_name}
                key={index}
                onClick={() => handleClickList(item)}
              >
                {item.movie_name}
              </span>
            ))}
          </div>
        )}
      </Form>
    </>
  );
};

export default withRouter(NavSearch);
