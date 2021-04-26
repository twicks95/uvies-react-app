import React, { Component } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import SearchActionDataMovie from "./SearchActionDataMovie/SearchActionDataMovie";
import styles from "./DataMovie.module.css";

class AdminMovieData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
    };
  }

  handleChangeInputSearch = (e) => {
    this.setState({ searchKeyword: e.target.value });
  };

  // renderMovieList = () => {}

  render() {
    const { searchKeyword } = this.state;
    const { handleUpdate, dataState } = this.props;
    return (
      <>
        <div
          className={`d-flex flex-column flex-md-row justify-content-between mb-3 ${styles.movieDataHead}`}
        >
          <h3 className={`mb-4 mb-md-0`}>Movie Data</h3>
          <SearchActionDataMovie
            handleRequestGet={this.props.handleGet}
            searchKeyword={searchKeyword}
            handleChangeInputSearch={this.handleChangeInputSearch}
          />
        </div>
        <Row xs={2} md={3} lg={4} className={`${styles.wrapper} m-0 border`}>
          {/* <Spinner animation="grow" variant="warning" /> */}
          {dataState.map((item, index) => {
            return (
              <Col className={`d-flex justify-content-center py-3`} key={index}>
                <MovieCard
                  data={item}
                  handleUpdate={handleUpdate}
                  handleDelete={this.props.handleDelete}
                  isAdminManageMovie={true}
                />
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default AdminMovieData;
