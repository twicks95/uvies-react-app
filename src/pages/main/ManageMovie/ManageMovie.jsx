import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import SelectOptionButton from "./SelectOptionButton";
import DataMovie from "../../../components/DataMovie/DataMovie";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./ManageMovie.module.css";

import movieImage from "../../../assets/img/the-witches.png";
import axiosApiIntances from "../../../utils/axios";
import qs from "query-string";

class ManageMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieHours: "00",
        movieMinutes: "00",
        movieDuration: "",
        movieDirector: "",
        movieCasts: "",
        movieSynopsis: "",
      },
      data: [],
      isUpdate: false,
      movieId: "",
      isAdmin: true,
      isLoggedIn: true,
    };
  }

  // Method akan dijalankan ketika ada fungsi .setState yang yang akan mengupdate state dijalankan
  // componentDidUpdate() {
  //   setTimeout(() => {
  //     console.log(this.state.form);
  //   }, 3000);
  // }
  
  componentDidMount() {
    this.getData();
  }

  getData = (e, path) => {
    if (e) {
      e.preventDefault();
    }

    if (!path) {
      path = "";
    }

    axiosApiIntances
      .get(`/movie?limit=8&sort=movie_created_at DESC${path}`)
      .then((res) => {
        this.setState({ data: res.data.data });
      })
      .catch((err) => {
        alert(err);
      });
  };

  resetForm = (e) => {
    e.preventDefault();
    this.setState({
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieHours: "00",
        movieMinutes: "00",
        movieDuration: "",
        movieDirector: "",
        movieCasts: "",
        movieSynopsis: "",
      },
      isUpdate: false,
    });
  };

  handleFormChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  createMovie = (e, data) => {
    e.preventDefault();
    let isContinue;
    if (this.state.isUpdate) {
      isContinue = window.confirm("Lanjut update data ini?");
    } else {
      isContinue = window.confirm("Lanjut submit data ini?");
    }

    const dataToBePosted = {
      ...data,
      movieDuration: `${this.state.form.movieHours}:${this.state.form.movieMinutes}:00`,
    };

    if (isContinue) {
      axiosApiIntances
        .post("/movie/", qs.stringify(dataToBePosted))
        .then((res) => {
          alert(res.data.msg);
          this.resetForm(e);
          this.getData();
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  setUpdate = (data) => {
    this.setState({
      form: {
        movieName: data.movie_name,
        movieCategory: data.movie_category,
        movieReleaseDate: data.movie_release_date.slice(0, 10),
        movieHours: data.movie_duration.slice(0, 2),
        movieMinutes: data.movie_duration.slice(3, 5),
        movieDuration: "",
        movieDirector: data.movie_director,
        movieCasts: data.movie_casts,
        movieSynopsis: data.movie_synopsis,
      },
      isUpdate: true,
      movieId: data.movie_id,
    });
  };

  updateMovie = (e, id, data) => {
    e.preventDefault();

    const dataToBeUpdated = {
      ...data,
      movieDuration: `${data.movieHours}:${data.movieMinutes}:00`,
    };

    console.log(dataToBeUpdated);

    axiosApiIntances
      .patch(`/movie/${id}?`, { ...dataToBeUpdated })
      .then((res) => {
        alert(res.data.msg);
        this.getData();
      })
      .catch((err) => {
        alert(err);
      });

    this.setState({ isUpdate: false });
    this.resetForm(e);
  };

  deleteMovie = (id) => {
    axiosApiIntances
      .delete(`/movie/${id}`)
      .then((res) => {
        alert(res.data.msg);
        this.getData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    const { isUpdate, isAdmin, isLoggedIn, movieId, form } = this.state;
    const {
      movieName,
      movieCategory,
      movieReleaseDate,
      movieHours,
      movieMinutes,
      movieDirector,
      movieCasts,
      movieSynopsis,
    } = this.state.form;

    console.log(this.state.data);

    return (
      <>
        <Navbar role={isAdmin} loginStatus={isLoggedIn} />
        <Container fluid as={`main`} className={`${styles.mainWrapper}`}>
          <Row xs={1}>
            <form
              onSubmit={
                isUpdate
                  ? (e) => this.updateMovie(e, movieId, form)
                  : (e) => this.createMovie(e, form)
              }
              onReset={this.resetForm}
            >
              <Col className={`${styles.movieForm}`}>
                <h3 className={`mb-3`}>Movie Form</h3>
                <Row xs={1} md={2} lg={3} className={`${styles.wrapper} m-0`}>
                  <Col lg={2} className={`p-0`}>
                    <Card
                      className={`d-flex justify-content-center ${styles.moviePoster}`}
                    >
                      <Card.Img
                        variant="top"
                        src={movieImage}
                        className={`${styles.movieImg}`}
                      />
                    </Card>
                  </Col>
                  <Col
                    lg={5}
                    className={`mt-5 mt-md-0 p-0 pl-md-4 pl-lg-4 ${styles.test}`}
                  >
                    <Form.Group controlId="movieName">
                      <Form.Label>Movie Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie title"
                        name="movieName"
                        value={movieName}
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="movieDirector">
                      <Form.Label>Director</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie director"
                        name="movieDirector"
                        value={movieDirector}
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="movie_release_date">
                      <Form.Label>Release Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="movieReleaseDate"
                        value={movieReleaseDate}
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={5} className={`mt-5 mt-lg-0 p-0 pl-lg-5`}>
                    <Form.Group controlId="movieCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie category"
                        name="movieCategory"
                        value={movieCategory}
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="movieCasts">
                      <Form.Label>Casts</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie casts"
                        name="movieCasts"
                        value={movieCasts}
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                    <div className={`d-flex ${styles.movieDuration}`}>
                      <SelectOptionButton
                        selectedIndex="3"
                        label={`Duration Hour`}
                        name={`movieHours`}
                        isMovieHours={true}
                        stateFormHours={movieHours}
                        handleChange={this.handleFormChange}
                      />
                      <SelectOptionButton
                        label={`Duration Minutes`}
                        name={`movieMinutes`}
                        isMovieHours={false}
                        stateFormMinutes={movieMinutes}
                        handleChange={this.handleFormChange}
                      />
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={`mt-5 mt-lg-4 p-0`}
                  >
                    <Form.Group controlId="synopsis" className={`mb-0`}>
                      <Form.Label>Synopsis</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="This movie synopsis"
                        name="movieSynopsis"
                        value={movieSynopsis}
                        onChange={(e) => this.handleFormChange(e)}
                        className={`py-2`}
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={`d-flex justify-content-end p-0 mt-5 ${styles.actionButton}`}
                  >
                    <Button
                      variant="outline-primary"
                      type="reset"
                      className={`mr-4 ${styles.resetButton}`}
                    >
                      {isUpdate ? "Cancel" : "Reset"}
                    </Button>
                    <Button variant="primary" type="submit">
                      {isUpdate ? "Update" : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </form>
            <Col className={`${styles.movieData}`}>
              <DataMovie
                handleGet={this.getData.bind(this)}
                handleUpdate={this.setUpdate.bind(this)}
                handleDelete={this.deleteMovie}
                dataState={this.state.data}
              />
            </Col>
            <Col className={`${styles.pagination}`}>
              <div>Pagination</div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default ManageMovie;
