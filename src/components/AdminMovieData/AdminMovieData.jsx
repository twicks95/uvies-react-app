import React, { Component } from "react";
import { Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./AdminMovieData.module.css";
import axiosApiIntances from "../../utils/axios";

class AdminMovieData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = (path) => {
    if (!path) {
      path = "";
    }

    axiosApiIntances
      .get(`/movie${path}`)
      .then((res) => {
        this.setState({ data: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { data } = this.state;
    const { handleUpdate } = this.props;

    return (
      <>
        <div
          className={`d-flex justify-content-between align-items-center mb-3 ${styles.movieDataHead}`}
        >
          <h3>Movie Data</h3>
          <div className={`d-flex align-items-center ${styles.searchAction}`}>
            <DropdownButton
              variant="outline-secondary"
              title="sort"
              id="sort"
              className={`mr-3`}
            >
              <Dropdown.Item
                onClick={() => this.getData(``)}
              >
                Show All
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.getData(`?sort=movie_name ASC`)}
              >
                By Name
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.getData(`?sort=movie_release_date ASC`)}
              >
                By Release Date
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.getData(`?sort=movie_created_at DESC`)}
              >
                By Currently Added
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item disabled>Uvies App</Dropdown.Item>
            </DropdownButton>
            <Form.Control type="text" placeholder="Search movie name ... " />
          </div>
        </div>
        <Row className={`${styles.wrapper} m-0 border`}>
          {data.map((item, index) => {
            return (
              <Col className={`d-flex justify-content-center py-3`} key={index}>
                <MovieCard
                  data={item}
                  handleUpdate={handleUpdate}
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
