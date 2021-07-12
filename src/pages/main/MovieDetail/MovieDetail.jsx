import React, { Component } from "react";
import qs from "query-string";
import moment from "moment";
import "moment-duration-format";
import axiosApiInstances from "../../../utils/axios";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import styles from "./MovieDetail.module.css";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Row,
  Toast,
} from "react-bootstrap";
import ImagePlaceholder from "../../../assets/img/default-img-placeholder.png";
import { connect } from "react-redux";
import { getPremieres } from "../../../redux/actions/premiere";
import Ebv from "../../../assets/img/ebu-id-logo.svg";
import Hiflix from "../../../assets/img/hiflix-logo.svg";
import CineOne from "../../../assets/img/cine-one-21-logo.svg";
import { XCircleIcon } from "@heroicons/react/solid";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premieres: [],
      movieName: "",
      movieGenre: "",
      movieRelease: "",
      movieDirector: "",
      movieDuration: "",
      movieCasts: "",
      movieSynopsis: "",
      moviePoster: null,
      location: "",
      date: "",
      locationList: [],
      limit: 100,
      selectedHour: "",
      hour: "",
      showToast: false,
      movieId: qs.parse(this.props.location.search),
    };
  }

  componentDidMount() {
    const { movieId } = qs.parse(this.props.location.search);
    const { date, location, limit } = this.state;
    this.getDataMovie(movieId);

    axiosApiInstances
      .get(
        `premiere?id=${movieId}&date=${date}&location=${location}&limit=${limit}`
      )
      .then((res) => {
        this.setState({ ...this.state, premieres: res.data.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, premieres: [] });
      });

    axiosApiInstances
      .get("premiere/location")
      .then((res) => {
        this.setState({ ...this.state, locationList: res.data.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, locationList: [] });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { movieId } = qs.parse(this.props.location.search);
    const { date, location, limit } = this.state;

    let api;
    if (date && location) {
      api = axiosApiInstances.get(
        `premiere?id=${movieId}&date=${date}&location=${location}&limit=${limit}`
      );
    } else if (location) {
      api = axiosApiInstances.get(
        `premiere?id=${movieId}&location=${location}&limit=${limit}`
      );
    } else if (date) {
      api = axiosApiInstances.get(
        `premiere?id=${movieId}&date=${date}&limit=${limit}`
      );
    } else {
      api = axiosApiInstances.get(
        `premiere?id=${movieId}&date=${date}&location=${location}&limit=${limit}`
      );
    }

    if (date !== prevState.date || location !== prevState.location) {
      api
        .then((res) => {
          this.setState({ ...this.state, premieres: res.data.data });
        })
        .catch((err) => {
          this.setState({ ...this.state, premieres: [] });
        });

      date && location
        ? this.props.history.push(
            `/movie/detail?movieId=${movieId}&date=${date}&location=${location}`
          )
        : date
        ? this.props.history.push(
            `/movie/detail?movieId=${movieId}&date=${date}`
          )
        : this.props.history.push(
            `/movie/detail?movieId=${movieId}&location=${location}`
          );
    }

    if (limit !== prevState.limit) {
      api
        .then((res) => {
          this.setState({ ...this.state, premieres: res.data.data });
        })
        .catch((err) => {
          this.setState({ ...this.state, premieres: [] });
        });
    }
  }

  getDataMovie = (id) => {
    axiosApiInstances
      .get(`movie/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          movieName: res.data.data[0].movie_name,
          movieGenre: res.data.data[0].movie_category,
          movieRelease: res.data.data[0].movie_release_date,
          movieDirector: res.data.data[0].movie_director,
          movieDuration: res.data.data[0].movie_duration,
          movieCasts: res.data.data[0].movie_casts,
          movieSynopsis: res.data.data[0].movie_synopsis,
          moviePoster: res.data.data[0].movie_poster,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    const role = this.props.auth.data.user_role;
    const {
      movieName,
      movieGenre,
      movieRelease,
      movieDirector,
      movieDuration,
      movieCasts,
      movieSynopsis,
      moviePoster,
      locationList,
      premieres,
      showToast,
    } = this.state;

    return (
      <>
        <Navbar />
        <main className={`${styles.mainWrapper}`}>
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
              className={styles.toast}
              style={{ backgroundColor: "white", width: "400px" }}
            >
              <Toast.Header>
                <XCircleIcon style={{ color: "#ea2e2e" }} />
                <strong className="me-auto">Booking Ticket</strong>
              </Toast.Header>
              <Toast.Body>
                Pick show time's hour in premiere ticket first.
              </Toast.Body>
            </Toast>
          </div>
          <Container fluid className={`${styles.movieDetails}`}>
            <Row xs={1} md={2} className={`g-0`}>
              <Col md={3} lg={4} className={`${styles.moviePosterContainer}`}>
                <Card className={`${styles.moviePoster}`}>
                  <Card.Img
                    variant="top"
                    src={
                      moviePoster
                        ? `${process.env.REACT_APP_API_MOVIE_POSTER_URL}/${moviePoster}`
                        : ImagePlaceholder
                    }
                    className={`${styles.movieImg}`}
                  />
                </Card>
              </Col>
              <Col md={9} lg={8} className={`${styles.movieDescContainer}`}>
                <div
                  className={`d-flex flex-column align-items-center align-items-md-start mb-5 ${styles.movieDescHead}`}
                >
                  <h1 className={`text-md-start`}>{movieName}</h1>
                  <p className={`m-0 ${styles.genre}`}>{movieGenre}</p>
                </div>
                <Row xs={2} className={`m-0`}>
                  <Col xs={6} md={4} className={`mb-3 p-0`}>
                    <h6 className=" ">Release date</h6>
                    <span className=" ">
                      {moment(movieRelease).format("ll")}
                    </span>
                  </Col>
                  <Col xs={6} md={8} className={`mb-3 p-0`}>
                    <h6 className=" ">Directed by</h6>
                    <span className=" ">{movieDirector}</span>
                  </Col>
                  <Col md={4} className={`p-0`}>
                    <h6 className=" ">Duration</h6>
                    <span className=" ">
                      {moment
                        .duration(movieDuration)
                        .format("h [hour] m [minute]")}
                    </span>
                  </Col>
                  <Col md={8} className={`p-0`}>
                    <h6 className=" ">Casts</h6>
                    <span className=" ">{movieCasts}</span>
                  </Col>
                </Row>
                <div className={`${styles.separator}`}></div>
                <div className="">
                  <h5>Synopsis</h5>
                  <p className={`m-0 ${styles.synopsisDesc}`}>
                    {movieSynopsis}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>

          <section
            className={`d-flex flex-column align-items-center ${styles.showtimesTicketContainer}`}
          >
            <h3 className={`${styles.titleHead}`}>Showtimes and Tickets</h3>
            <div
              className={`d-flex flex-column flex-md-row ${styles.dateAndPlacePicker}`}
            >
              <input
                className="form-control me-md-4 mb-3 mb-md-0"
                id="date"
                name="date"
                placeholder=""
                type="date"
                onChange={(e) =>
                  this.setState({ ...this.state, date: e.target.value })
                }
              />

              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                  className={`d-flex align-items-center justify-content-between`}
                >
                  {!this.state.location
                    ? "Select location"
                    : this.state.location}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {locationList.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          location: item.location_city,
                        })
                      }
                    >
                      {item.location_city}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Row style={{ rowGap: "20px" }}>
              {premieres.map((item, index) => (
                <Col className={styles.ticket} key={index}>
                  <div className="h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex flex-column flex-md-row">
                        <div
                          className={`d-flex align-items-center ${styles.cinemaLogoContainer}`}
                        >
                          <img
                            src={
                              item.premiere_name === "Ebv.id"
                                ? Ebv
                                : item.premiere_name === "Hiflix"
                                ? Hiflix
                                : CineOne
                            }
                            alt={item.premiere_name}
                          />
                        </div>
                        <div
                          className={`d-flex flex-column justify-content-center text-center text-lg-left text-md-start ${styles.cinemaInfoGroup}`}
                        >
                          <h3 className={styles.cinemaName}>CineOne21</h3>
                          <p className={`m-0 ${styles.cinemaLocation}`}>
                            {item.location_address}, {item.location_city}
                          </p>
                        </div>
                      </div>
                      <div className={styles.separator}></div>
                    </div>
                    <div>
                      <span className={styles.pickHour}>Pick hour</span>
                      <Row xs={4} className={`g-2 ${styles.hourGroup}`}>
                        {item.schedule_clock.map((hour, index) => (
                          <Col
                            key={index}
                            id={`${item.premiere_id}${index}`}
                            title={hour}
                            className={`${
                              this.state.selectedHour ===
                                `${item.premiere_id}${index}` && styles.selected
                            } ${styles.hour}`}
                            onClick={(e) => {
                              this.setState({
                                ...this.state,
                                selectedHour: e.target.id,
                                hour: e.target.title,
                              });
                            }}
                          >
                            <span
                              id={`${item.premiere_id}${index}`}
                              title={hour}
                              className="p-0"
                            >
                              {moment(`2021-12-12 ${hour}`)
                                .format("LT")
                                .toLowerCase()}
                            </span>
                          </Col>
                        ))}
                      </Row>
                    </div>
                    <div>
                      <div
                        className={`d-flex justify-content-between align-items-center ${styles.priceGroup}`}
                      >
                        <p className="m-0">Price</p>
                        <span className={styles.price}>
                          IDR{item.premiere_price.toLocaleString("id-ID")}/seat
                        </span>
                      </div>
                      {role !== "admin" && (
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => {
                            if (this.state.hour) {
                              localStorage.setItem(
                                "movie",
                                this.state.movieName
                              );
                              localStorage.setItem(
                                "movieId",
                                this.state.movieId.movieId
                              );
                              localStorage.setItem(
                                "premiere",
                                item.premiere_name
                              );
                              localStorage.setItem(
                                "premiereId",
                                item.premiere_id
                              );
                              localStorage.setItem(
                                "price",
                                item.premiere_price
                              );
                              localStorage.setItem(
                                "date",
                                item.schedule_date_start
                              );
                              localStorage.setItem(
                                "locationId",
                                item.location_id
                              );
                              localStorage.setItem("hour", this.state.hour);
                              this.props.history.push("/order");
                            } else {
                              this.setState({ ...this.state, showToast: true });
                            }
                          }}
                        >
                          Book now
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            {/* <div
              className={`d-flex align-items-center justify-content-center w-100 ${styles.viewMore}`}
            >
              <a
                href="null"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ ...this.state, limit: this.state.limit + 6 });
                }}
                className="text-decoration-none"
              >
                view more
              </a>
            </div> */}
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  premiere: state.premiere,
});

const mapDispatchToProps = { getPremieres };

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
