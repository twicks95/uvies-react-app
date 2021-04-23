import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import MovieCard from "../../../components/MovieCard/MovieCard";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
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
        movieDuration: "02:01:90",
        movieDirector: "",
        movieCasts: "",
        movieSynopsis: "",
      },
      isUpdate: false,
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
    this.setState = {
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieDuration: "02:01:90",
        movieDirector: "",
        movieCasts: "",
        movieSynopsis: "",
      },
    };
  };

  handleFormChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitMovie = (e, data) => {
    e.preventDefault();
    let isContinue = window.confirm("Lanjut submit data ini?");
    console.log(isContinue);

    if (isContinue) {
      axiosApiIntances
        .post("/movie/", qs.stringify(data))
        .then((res) => {
          alert(res.data.msg);
          this.resetForm(e);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  // setUpdate = () => {

  // }

  // updateMovie;

  // handleSortingMovieBy = (e) => {
  //   // alert("OK")
  //   console.log(e)

  // }

  render() {
    const { isUpdate, form } = this.state;
    console.log(form);

    return (
      <>
        <Navbar />
        <Container fluid as={`main`} className={`${styles.mainWrapper}`}>
          <Row xs={1}>
            <form
              onSubmit={
                isUpdate ? this.updateMovie : (e) => this.submitMovie(e, form)
              }
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
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="movie_release_date">
                      <Form.Label>Release Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="movieReleaseDate"
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
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="movieCasts">
                      <Form.Label>Casts</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie casts"
                        name="movieCasts"
                        onChange={(e) => this.handleFormChange(e)}
                      />
                    </Form.Group>
                    <div className={`d-flex`}>
                      <Form.Group
                        controlId="movieDurationHour"
                        className={`mr-3`}
                      >
                        <Form.Label>Duration Hour</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Hour"
                          name="movieHours"
                          onChange={(e) => this.handleFormChange(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId="movieDurationMinute">
                        <Form.Label>Duration Minute</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Minute"
                          name="movieMinutes"
                          onChange={(e) => this.handleFormChange(e)}
                        />
                      </Form.Group>
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
                    <Button variant="outline-primary" className={`mr-4`}>
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
              <div
                className={`d-flex justify-content-between align-items-center mb-3 ${styles.movieDataHead}`}
              >
                <h3>Movie Data</h3>
                <div
                  className={`d-flex align-items-center ${styles.searchAction}`}
                >
                  <DropdownButton
                    variant="outline-secondary"
                    title="sort"
                    id="sort"
                    className={`mr-3`}
                  >
                    <Dropdown.Item
                      onClick={() => this.handleSortingMovieBy("movie_name")}
                    >
                      By Name
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        this.handleSortingMovieBy("movie_release_date")
                      }
                    >
                      By Release Date
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => this.handleSortingMovieBy()}>
                      Separated link
                    </Dropdown.Item>
                  </DropdownButton>
                  <Form.Control
                    type="text"
                    placeholder="Search movie name ... "
                  />
                </div>
              </div>
              <Row className={`${styles.wrapper} m-0`}>
                <Col>
                  <MovieCard isAdminMovieData={true} />
                </Col>
              </Row>
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
