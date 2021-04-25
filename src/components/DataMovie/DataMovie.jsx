import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import SearchActionDataMovie from "./SearchActionDataMovie/SearchActionDataMovie";
import styles from "./DataMovie.module.css";
// import axiosApiIntances from "../../utils/axios";

class AdminMovieData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      searchKeyword: "",
    };
    // console.log(props)
    // this.getData = this.getData.bind(this);
  }

  handleChangeInputSearch = (e) => {
    this.setState({ searchKeyword: e.target.value });
  };

  // componentDidMount() {
  //   this.getData();
  // }

  // getData = (e, path) => {
  //   e.preventDefault();

  //   if (!path) {
  //     path = "";
  //   }

  //   axiosApiIntances
  //     .get(`/movie?limit=8${path}`)
  //     .then((res) => {
  //       this.setState({ data: res.data.data });
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  // deleteMovie = (id) => {
  //   axiosApiIntances
  //     .delete(`/movie/${id}`)
  //     .then((res) => {
  //       alert(res.data.msg);
  //       // this.getData();
  //       this.props.handleGet()
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  render() {
    const { searchKeyword } = this.state;
    // const { data } = this.state;
    const { handleUpdate, dataState } = this.props;
    // console.log(this.props)
    return (
      <>
        <div
          className={`d-flex justify-content-between align-items-center mb-3 ${styles.movieDataHead}`}
        >
          <h3>Movie Data</h3>
          <SearchActionDataMovie
            handleRequestGet={this.props.handleGet}
            searchKeyword={searchKeyword}
            handleChangeInputSearch={this.handleChangeInputSearch}
          />
        </div>
        <Row xs={2} md={3} lg={4} className={`${styles.wrapper} m-0 border`}>
          {dataState.map((item, index) => {
            return (
              <Col className={`d-flex justify-content-center py-3`} key={index}>
                <MovieCard
                  data={item}
                  handleUpdate={handleUpdate}
                  handleDelete={this.props.handleDelete}
                  isAdminMovieData={true}
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
