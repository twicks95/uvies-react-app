import React, { Component } from "react";
import qs from "query-string";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  getMovies,
  createMovie,
  createMovieImage,
  updateMovie,
  updateMovieImage,
  deleteMovie,
  deleteMovieImage,
} from "../../../redux/actions/movie";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import SelectOptionDuration from "./DataMovie/SelectOptionDuration";
import DataMovie from "./DataMovie/DataMovie";
import styles from "./ManageMovie.module.css";
import ImagePlaceholder from "../../../assets/img/default-img-placeholder.png";
import ReactPaginate from "react-paginate";
import { DocumentAddIcon } from "@heroicons/react/outline";
import {
  XIcon,
  UploadIcon,
  XCircleIcon,
  CheckCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";

class ManageMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        movieName: "",
        movieCasts: "",
        movieHours: "00",
        movieMinutes: "00",
        movieCategory: "",
        movieDuration: "",
        movieDirector: "",
        movieSynopsis: "",
        movieReleaseDate: "",
      },
      page: qs.parse(props.location.search).page
        ? qs.parse(props.location.search).page
        : "1",
      sort: "",
      limit: "8",
      keyword: "",
      movieId: "",
      image: null,
      isAdmin: true,
      isCreate: true,
      isUpdate: false,
      uploading: false,
      showModal: false,
      isLoggedIn: true,
      showToast: false,
      showToast2: false,
      deleteMovie: false,
      imageUploaded: false,
      isCreateDataSuccess: false,
      isUpdateDataSuccess: false,
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { keyword, sort, page } = this.state;
    if (
      this.state.keyword !== prevState.keyword ||
      this.state.sort !== prevState.sort
    ) {
      this.getMovies();
      keyword && sort
        ? this.props.history.push(
            `/manage/movie?keyword=${keyword}&sort=${sort}&page=${page}`
          )
        : keyword
        ? this.props.history.push(
            `/manage/movie?keyword=${keyword}&page=${page}`
          )
        : sort
        ? this.props.history.push(`/manage/movie?sort=${sort}&page=${page}`)
        : this.props.history.push(`/manage/movie?page=${page}`);
    }
  }

  getMovies = () => {
    const { keyword, sort, page, limit } = this.state;
    this.props.getMovies(keyword, sort, page, limit);
  };

  changeState = (e) => {
    this.setState({
      ...this.state,
      [e.target.name === "keyword" && "keyword"]: e.target.value,
      [e.target.name === "sort" && "sort"]: e.target.id,
    });
  };

  changeStateForm = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleFile = (e) => {
    this.setState({
      ...this.state,
      image: e.target.files[0],
      imageUploaded: false,
    });
  };

  createMovieImage = () => {
    const { image } = this.state;
    const data = { image };

    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }
    this.props
      .createMovieImage(formData)
      .then((res) => {
        this.setState({
          ...this.state,
          image: this.props.movie.movieData.movie_poster,
          movieId: this.props.movie.movieData.id,
          showToast: true,
          // isCreate: false,
          imageUploaded: true,
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          image: null,
          showToast: true,
        });
      });
  };

  updateMovieImage = () => {
    const { image, movieId } = this.state;
    const data = { image };

    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }
    this.props
      .updateMovieImage(movieId, formData)
      .then((res) => {
        this.setState({
          ...this.state,
          image: this.props.movie.movieData.movie_poster,
          showToast: true,
          imageUploaded: true,
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          image: null,
          showToast: true,
        });
      });
  };

  deleteMovieImage = () => {
    const { movieId } = this.state;
    this.props
      .deleteMovieImage(movieId)
      .then((res) => {
        this.setState({
          ...this.state,
          image: this.props.movie.movieData.movie_poster,
          imageUploaded: true,
          isCreate: true,
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          image: null,
        });
      });
  };

  createMovie = (e, data) => {
    e.preventDefault();
    const { movieId } = this.state;
    const {
      movieName,
      movieCasts,
      movieDirector,
      movieCategory,
      movieReleaseDate,
    } = this.state.form;
    if (
      movieName &&
      movieCategory &&
      movieDirector &&
      movieCasts &&
      movieReleaseDate
    ) {
      if (movieId) {
        const dataToBePosted = {
          ...data,
          movieDuration: `${this.state.form.movieHours}:${this.state.form.movieMinutes}:00`,
        };
        delete dataToBePosted.movieHours;
        delete dataToBePosted.movieMinutes;
        this.props.updateMovie(movieId, dataToBePosted).then(() => {
          this.setState({
            ...this.state,
            movieId: this.props.movie.movieData.id,
            showToast2: true,
          });
          this.getMovies();
          this.resetForm();
        });
      } else {
        const dataToBePosted = {
          ...data,
          movieDuration: `${this.state.form.movieHours}:${this.state.form.movieMinutes}:00`,
        };
        delete dataToBePosted.movieHours;
        delete dataToBePosted.movieMinutes;
        this.props.createMovie(dataToBePosted).then(() => {
          this.setState({
            ...this.state,
            movieId: this.props.movie.movieData.id,
            isCreateDataSuccess: true,
            showToast2: true,
          });
          this.getMovies();
          this.resetForm();
        });
      }
    }
  };

  updateMovie = (e, id, data) => {
    e.preventDefault();
    const dataToBePosted = {
      ...data,
      movieDuration: `${this.state.form.movieHours}:${this.state.form.movieMinutes}:00`,
    };
    delete dataToBePosted.movieHours;
    delete dataToBePosted.movieMinutes;
    this.props.updateMovie(id, data).then(() => {
      this.setState({
        form: {
          ...this.state.form,
          image: null,
        },
        isUpdateDataSuccess: true,
        isCreate: true,
        showToast2: true,
      });
      window.setTimeout(() => {
        this.setState({ ...this.state, isUpdateDataSuccess: false });
      }, 5000);
      this.getMovies();
      this.resetForm();
    });
  };

  deleteMovie = (id) => {
    this.setState({ ...this.state, movieId: id, showModal: true });
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
      image: data.movie_poster,
      movieId: data.movie_id,
      isCreate: false,
      isUpdate: true,
      imageUploaded: true,
    });
  };

  resetForm = (e) => {
    e && e.preventDefault();
    this.setState({
      form: {
        movieName: "",
        movieCasts: "",
        movieCategory: "",
        movieDirector: "",
        movieDuration: "",
        movieSynopsis: "",
        movieHours: "00",
        movieMinutes: "00",
        movieReleaseDate: "",
      },
      image: null,
      isUpdate: false,
      imageUploaded: false,
      movieId: "",
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const { keyword, sort, page } = this.state;
    this.setState({ page: selectedPage }, () => {
      this.getMovies();
      keyword && sort
        ? this.props.history.push(
            `/manage/movie?keyword=${keyword}&sort=${sort}&page=${page}`
          )
        : keyword
        ? this.props.history.push(
            `/manage/movie?keyword=${keyword}&page=${page}`
          )
        : sort
        ? this.props.history.push(`/manage/movie?sort=${sort}&page=${page}`)
        : this.props.history.push(`/manage/movie?page=${page}`);
    });
  };

  render() {
    const {
      form,
      image,
      isAdmin,
      movieId,
      isUpdate,
      isCreate,
      showModal,
      showToast,
      showToast2,
      isLoggedIn,
      imageUploaded,
      isUpdateDataSuccess,
    } = this.state;
    const {
      movieName,
      movieCasts,
      movieHours,
      movieMinutes,
      movieDirector,
      movieSynopsis,
      movieCategory,
      movieReleaseDate,
    } = this.state.form;
    const { isError, createMsg, updateMsg, imageMsg } = this.props.movie;

    return (
      <>
        <Navbar role={isAdmin} loginStatus={isLoggedIn} />
        <Container fluid as={`main`} className={`${styles.mainWrapper}`}>
          {/* CONFIRM MODAL */}
          <Modal
            size="sm"
            show={showModal}
            onHide={() => this.setState({ ...this.state, showModal: false })}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
          >
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-sm">
                Delete Movie
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-start">
              Are you sure want to delete this movie?
              <Alert
                variant="danger"
                className="d-flex flex-column align-items-center justify-content-center text-bold text-center mt-3"
                style={{
                  fontSize: ".8em",
                  fontWeight: "600",
                  backgroundColor: "#ff9aa4",
                  color: "#b91929",
                }}
              >
                <ExclamationIcon style={{ height: "28px" }} />
                Warning! This action will permanently deleting the data in
                database and cannot be restored.
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ height: "36px", padding: "0px 10%" }}
                variant="light"
                onClick={() =>
                  this.setState({ ...this.state, showModal: false })
                }
              >
                Close
              </Button>
              <Button
                style={{ height: "36px", padding: "0px 10%" }}
                variant="danger"
                onClick={() => {
                  this.props.deleteMovie(movieId).then(() => {
                    this.getMovies();
                    this.setState({ ...this.state, showModal: false });
                  });
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* END OF CONFIRM MODAL */}
          {/* TOAST */}
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 0,
              zIndex: 1,
            }}
          >
            <Toast
              onClose={() => this.setState({ ...this.state, showToast: false })}
              show={showToast}
              delay={5000}
              autohide
              className={styles.toastSuccess}
              style={{ backgroundColor: "white", width: "400px" }}
            >
              <Toast.Header>
                {isError ? (
                  <XCircleIcon style={{ color: "#ea2e2e" }} />
                ) : (
                  <CheckCircleIcon style={{ color: "#5f2eea" }} />
                )}
                <strong className="me-auto">Upload Image</strong>
              </Toast.Header>
              <Toast.Body>{imageMsg}</Toast.Body>
            </Toast>
            <Toast
              onClose={() =>
                this.setState({ ...this.state, showToast2: false })
              }
              show={showToast2}
              delay={5000}
              autohide
              className={styles.toastSuccess}
              style={{ backgroundColor: "white", width: "400px" }}
            >
              <Toast.Header>
                {isError ? (
                  <XCircleIcon style={{ color: "#ea2e2e" }} />
                ) : (
                  <CheckCircleIcon style={{ color: "#5f2eea" }} />
                )}
                <strong className="me-auto">Movie Data</strong>
              </Toast.Header>
              {isUpdateDataSuccess ? (
                <Toast.Body>{updateMsg}</Toast.Body>
              ) : (
                <Toast.Body>{createMsg}</Toast.Body>
              )}
            </Toast>
          </div>
          {/* END OF TOAST */}
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
                <Row
                  xs={1}
                  md={2}
                  lg={3}
                  className={`g-5 ${styles.wrapper} m-0`}
                >
                  <Col lg={3}>
                    <Card
                      className={`d-flex justify-content-center ${styles.moviePoster}`}
                    >
                      <div className={`${styles.movieImg}`}>
                        <Card.Img
                          variant="top"
                          src={
                            !image
                              ? ImagePlaceholder
                              : `${process.env.REACT_APP_API_MOVIE_POSTER_URL}/${image}`
                          }
                        />
                        <div
                          className={`d-flex flex-column ${
                            image ? styles.showBackground : ""
                          }`}
                        >
                          {!image || imageUploaded ? (
                            <label
                              for="upload"
                              className={`mb-2 ${styles.uploadBtn} ${
                                image && styles.showButton
                              }`}
                            >
                              <DocumentAddIcon className={styles.uploadIcon} />
                              Choose image
                            </label>
                          ) : (
                            <label
                              className={`${styles.uploadBtn} ${
                                image && styles.showButton
                              }`}
                              onClick={
                                isCreate
                                  ? this.createMovieImage
                                  : this.updateMovieImage
                              }
                            >
                              <UploadIcon className={styles.plusIcon} />
                              Upload
                            </label>
                          )}
                          {image && (
                            <label
                              className={`${styles.removeBtn} ${styles.showButton}`}
                              onClick={this.deleteMovieImage}
                            >
                              <XIcon className={styles.xIcon} />
                              Remove
                            </label>
                          )}
                        </div>
                        <input
                          type="file"
                          id="upload"
                          onChange={(e) => this.handleFile(e)}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col lg={4} className={styles.test}>
                    <Form.Group
                      controlId="movieName"
                      className={styles.formGroup}
                    >
                      <Form.Label>
                        Movie Name
                        <span
                          className={!movieName ? styles.show : styles.hide}
                        >
                          (Required field)
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie title"
                        name="movieName"
                        value={movieName}
                        className={!movieName ? styles.redBorder : ""}
                        onChange={(e) => this.changeStateForm(e)}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="movieDirector"
                      className={styles.formGroup}
                    >
                      <Form.Label>
                        Director
                        <span
                          className={!movieDirector ? styles.show : styles.hide}
                        >
                          (Required field)
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie director"
                        name="movieDirector"
                        value={movieDirector}
                        className={!movieDirector ? styles.redBorder : ""}
                        onChange={(e) => this.changeStateForm(e)}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="movie_release_date"
                      className={styles.formGroup}
                    >
                      <Form.Label>
                        Release Date
                        <span
                          className={
                            !movieReleaseDate ? styles.show : styles.hide
                          }
                        >
                          (Required field)
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="movieReleaseDate"
                        value={movieReleaseDate}
                        className={!movieReleaseDate ? styles.redBorder : ""}
                        onChange={(e) => this.changeStateForm(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={5}>
                    <Form.Group
                      controlId="movieCategory"
                      className={styles.formGroup}
                    >
                      <Form.Label>
                        Category
                        <span
                          className={!movieCategory ? styles.show : styles.hide}
                        >
                          (Required field)
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie category"
                        name="movieCategory"
                        value={movieCategory}
                        className={!movieCategory ? styles.redBorder : ""}
                        onChange={(e) => this.changeStateForm(e)}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="movieCasts"
                      className={styles.formGroup}
                    >
                      <Form.Label>
                        Casts
                        <span
                          className={!movieCasts ? styles.show : styles.hide}
                        >
                          (Required field)
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Movie casts"
                        name="movieCasts"
                        value={movieCasts}
                        className={!movieCasts ? styles.redBorder : ""}
                        onChange={(e) => this.changeStateForm(e)}
                      />
                    </Form.Group>
                    <div className={`d-flex ${styles.movieDuration}`}>
                      <SelectOptionDuration
                        selectedIndex="3"
                        label={`Duration Hour`}
                        name={`movieHours`}
                        isMovieHours={true}
                        stateFormHours={movieHours}
                        handleChange={this.changeStateForm}
                      />
                      <SelectOptionDuration
                        label={`Duration Minutes`}
                        name={`movieMinutes`}
                        isMovieHours={false}
                        stateFormMinutes={movieMinutes}
                        handleChange={this.changeStateForm}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group controlId="synopsis" className={`mb-0`}>
                      <Form.Label>Synopsis</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="This movie synopsis"
                        name="movieSynopsis"
                        value={movieSynopsis}
                        onChange={(e) => this.changeStateForm(e)}
                        className={`py-2`}
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={`d-flex justify-content-end ${styles.actionButton}`}
                  >
                    <Button
                      variant="outline-primary"
                      type="reset"
                      className={`me-4 ${styles.resetButton}`}
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
                // handleGet={this.getData.bind(this)}
                changeState={this.changeState}
                page={this.state.page}
                handleUpdate={this.setUpdate.bind(this)}
                handleDelete={this.deleteMovie}
                // dataState={this.state.data}
              />
            </Col>
            <Col
              className={`d-flex justify-content-center ${styles.pagination}`}
            >
              <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={
                  this.props.movie.pagination.totalPage === 1
                    ? null
                    : this.props.movie.pagination.totalPage
                } // Total page
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({ movie: state.movie });
const mapDispatchToProps = {
  getMovies,
  createMovie,
  createMovieImage,
  updateMovie,
  updateMovieImage,
  deleteMovie,
  deleteMovieImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovie);
