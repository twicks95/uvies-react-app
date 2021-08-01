import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormControl } from "react-bootstrap";
import IconSearch from "../../../assets/icons/search-icon.svg";
import styles from "./NavSearch.module.css";
import axiosApiInstances from "../../../utils/axios";
import Loading from "../../../assets/icons/Ellipsis-1.4s-70px.svg";

const NavSearch = (props) => {
  const [show, setShow] = useState(false);
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [width, setWidth] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const resizeWindow = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    !keyword && setResult([]);
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword) {
      setSearching(true);
      axiosApiInstances
        .get(`movie?searchByName=${keyword}`)
        .then((res) => setResult(res.data.data))
        .finally(() => setSearching(false));
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
          type={width < 992 ? "submit" : ""}
          variant="light"
          className={`shadow-none ${styles.btnSearch}`}
          onClick={() =>
            !show ? setShow(true) : (setShow(false), setResult([]))
          }
        >
          <img
            src={searching ? Loading : IconSearch}
            alt="Search"
            className={`${searching ? styles.loading : ""}`}
          />
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
