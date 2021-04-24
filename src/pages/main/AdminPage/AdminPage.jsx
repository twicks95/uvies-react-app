import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import SelectOptionButton from "./SelectOptionButton";
import AdminMovieData from "../../../components/AdminMovieData/AdminMovieData";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./AdminPage.module.css";

import movieImage from "../../../assets/img/the-witches.png";
import axiosApiIntances from "../../../utils/axios";
import qs from "query-string";
// import ebvid from "../../../assets/img/ebu-id-logo.svg";
// import cineOne21 from "../../../assets/img/cine-one-21-logo.svg";
// import hiflix from "../../../assets/img/hiflix-logo.svg";

export default class AdminPage extends Component {
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
      isUpdate: false,
      movieId: "",
    };
  }

  // Method akan dijalankan ketika ada fungsi .setState yang yang akan mengupdate state dijalankan
  // componentDidUpdate() {
  //   setTimeout(() => {
  //     console.log(this.state.form);
  //   }, 3000);
  // }

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

  updateMovie = (e, data) => {
    e.preventDefault();
    const dataToBeUpdated = {
      ...data,
      movieDuration: `${this.state.form.movieHours}:${this.state.form.movieMinutes}:00`,
    };

    console.log(dataToBeUpdated);
    // const id = this.state.movieId
    // axiosApiIntances.patch(`/movie/${id}`, {dataToBeUpdated, id}).then((res) => {

    // }).catch((err) => {

    // })

    // this.setState({ isUpdate: false });
    this.resetForm(e);
  };

  deleteMovie = (id) => {};

  // updateMovie;

  // handleSortingMovieBy = (e) => {
  //   // alert("OK")
  //   console.log(e)

  // }

  render() {
    const { isUpdate, form } = this.state;
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
    // console.log(form);

    console.log(this.state);
    return (
      <>
        <Navbar />
        <Container fluid as={`main`} className={`${styles.mainWrapper}`}>
          <Row xs={1}>
            <form
              onSubmit={
                isUpdate
                  ? (e) => this.updateMovie(e, form)
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
                        required
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
                      <SelectOptionButton selectedIndex="3"
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
                      Reset
                    </Button>
                    <Button variant="primary" type="submit">
                      {isUpdate ? "Update" : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </form>
            <Col className={`${styles.movieData}`}>
              <AdminMovieData handleUpdate={this.setUpdate.bind(this)} />
            </Col>
            <Col className={`${styles.pagination}`}>
              <div>Pagination</div>
            </Col>
            {/* <Col lg={5} className={`border p-0`}>
              <div className={` danger`}>
                <h3>Premiere Location</h3>
                <div
                  className={`d-flex flex-column align-items-center ${Styles.wrapper}  warning`}
                >
                  <Dropdown className={`w-100 mb-4 border`}>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      className={`d-flex align-items-center justify-content-between w-100`}
                    >
                      Purwokerto
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Container fluid className={`overflow-hidden p-0`}>
                    <Row xs={3} className={`g-5`}>
                      <Col className={`border`}>
                        <div
                          className={`${Styles.premiereLocationImgWrapper} d-flex align-items-center justify-content-center`}
                        >
                          <img
                            src={ebvid}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                      <Col className={`border`}>
                        <div
                          className={`${Styles.premiereLocationImgWrapper} d-flex align-items-center justify-content-center`}
                        >
                          <img
                            src={cineOne21}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                      <Col className={`border`}>
                        <div
                          className={`${Styles.premiereLocationImgWrapper} d-flex align-items-center justify-content-center`}
                        >
                          <img
                            src={hiflix}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                      <Col className={`border`}>
                        <div
                          className={`${Styles.premiereLocationImgWrapper} d-flex align-items-center justify-content-center`}
                        >
                          <img
                            src={ebvid}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
              <div className={` success`}>
                <h3>Showtimes</h3>
                <div className={`${Styles.wrapper} border`}>Content</div>
              </div>
            </Col> */}
          </Row>
          {/* <Row xs={1} as={`section`} className={`border`}>
            <h3>Sales Charts</h3>
            <div className={`${Styles.salesChartNav} ${Styles.wrapper}`}></div>
          </Row> */}
        </Container>
        <Footer />
      </>
    );
  }
}
