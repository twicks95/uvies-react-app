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
import { setBooking } from "../../../redux/actions/booking";
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
      location: qs.parse(this.props.location.search).location || "",
      date: qs.parse(this.props.location.search).date || "",
      locationList: [],
      limit: 100,
      selectedHour: "",
      hour: "",
      showToast: false,
      movieId: this.props.match.params.id,
    };
  }

  getDate = () => new Date(Date.now());

  componentDidMount() {
    const { movieId } = this.state;
    this.getDataMovie(movieId);

    const reqEndpoint = this.getPremiere(this.state);
    reqEndpoint
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
    const { date, location, limit, movieId } = this.state;
    const reqEndpoint = this.getPremiere(this.state);

    if (date !== prevState.date || location !== prevState.location) {
      reqEndpoint
        .then((res) => {
          this.setState({ ...this.state, premieres: res.data.data });
        })
        .catch((err) => {
          this.setState({ ...this.state, premieres: [] });
        });

      if (date && location) {
        this.props.history.push(
          `/movie/detail/${movieId}?date=${date}&location=${location}`
        );
      } else if (date) {
        this.props.history.push(`/movie/detail/${movieId}?date=${date}`);
      } else {
        this.props.history.push(
          `/movie/detail/${movieId}?location=${location}`
        );
      }
    }
    if (limit !== prevState.limit) {
      reqEndpoint
        .then((res) => {
          this.setState({ ...this.state, premieres: res.data.data });
        })
        .catch((err) => {
          this.setState({ ...this.state, premieres: [] });
        });
    }
    if (movieId !== prevState.movieId) {
      this.getDataMovie(movieId);
    }
  }

  setMovieId = (id) => {
    this.setState({ ...this.state, movieId: id });
  };

  getDataMovie = (id) => {
    axiosApiInstances
      .get(`movie/${id}`)
      .then((res) => {
        const {
          movie_casts,
          movie_category,
          movie_director,
          movie_duration,
          movie_name,
          movie_poster,
          movie_release_date,
          movie_synopsis,
        } = res.data.data[0];

        this.setState({
          ...this.state,
          movieName: movie_name,
          movieGenre: movie_category,
          movieRelease: movie_release_date,
          movieDirector: movie_director,
          movieDuration: movie_duration,
          movieCasts: movie_casts,
          movieSynopsis: movie_synopsis,
          moviePoster: movie_poster,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  getPremiere = ({ date, location, limit, movieId }) => {
    if (!date) {
      const d = new Date(Date.now());
      date = `${d.getFullYear()}-${
        d.getMonth().toString().length === 1
          ? `0${d.getMonth() + 1}`
          : d.getMonth() + 1
      }-${
        d.getDate().toString().length === 1 ? `0${d.getDate()}` : d.getDate()
      }`;
      this.setState({ ...this.state, date });
    }

    let reqEndpoint;
    if (date && location) {
      reqEndpoint = axiosApiInstances.get(
        `premiere?id=${movieId}&date=${date}&location=${location}&limit=${limit}`
      );
    } else if (location) {
      reqEndpoint = axiosApiInstances.get(
        `premiere?id=${movieId}&location=${location}&limit=${limit}`
      );
    } else if (date) {
      reqEndpoint = axiosApiInstances.get(
        `premiere?id=${movieId}&date=${date}&limit=${limit}`
      );
    } else {
      reqEndpoint = axiosApiInstances.get(
        `premiere?id=${movieId}&date=${date}&location=${location}&limit=${limit}`
      );
    }
    return reqEndpoint;
  };

  handleBook = (item) => {
    if (this.state.hour) {
      const bookingData = {
        movieId: this.state.movieId,
        movieName: this.state.movieName,
        hour: this.state.hour,
        premiereId: item.premiere_id,
        premiereName: item.premiere_name,
        premierePrice: item.premiere_price,
        schedule: this.state.date,
        locationId: item.location_id,
      };
      this.props.setBooking(bookingData);
      this.props.history.push("/order");
    } else {
      this.setState({
        ...this.state,
        showToast: true,
      });
    }
  };

  render() {
    const role = this.props.auth.data.user_role;
    const {
      // movieId,
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
      date,
      // hour,
    } = this.state;
    console.log(this.getDate(), new Date(this.state.date));
    return (
      <>
        <Navbar handleSetMovieId={this.setMovieId} />
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
            <Row xs={1} lg={2} className={`g-0`}>
              <Col
                xs={12}
                lg={4}
                className={`mb-md-5 mb-lg-0 ${styles.moviePosterContainer}`}
              >
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
              <Col xs={12} lg={8} className={`${styles.movieDescContainer}`}>
                <div
                  className={`d-flex flex-column align-items-center align-items-md-start mb-5 ${styles.movieDescHead}`}
                >
                  <h1 className={`text-md-start`}>{movieName}</h1>
                  <p className={`m-0 ${styles.genre}`}>{movieGenre}</p>
                </div>
                <Row xs={2} className={`m-0`}>
                  <Col xs={6} md={4} className={`mb-3 p-0`}>
                    <h6>Release date</h6>
                    <span>{moment(movieRelease).format("ll")}</span>
                  </Col>
                  <Col xs={6} md={8} className={`mb-3 p-0`}>
                    <h6>Directed by</h6>
                    <span>{movieDirector}</span>
                  </Col>
                  <Col md={4} className={`p-0`}>
                    <h6>Duration</h6>
                    <span>
                      {moment
                        .duration(movieDuration)
                        .format("h [hour] m [minute]")}
                    </span>
                  </Col>
                  <Col md={8} className={`p-0`}>
                    <h6>Casts</h6>
                    <span>{movieCasts}</span>
                  </Col>
                </Row>
                <div className={`${styles.separator}`}></div>
                <div>
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
                value={date}
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
                  <Dropdown.Item
                    onClick={() =>
                      this.setState({
                        ...this.state,
                        location: "",
                      })
                    }
                  >
                    All
                  </Dropdown.Item>
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
                            } ${
                              new Date(this.state.date) < this.getDate() &&
                              this.getDate() >=
                                this.getDate().setHours(
                                  parseInt(hour.split(":")[0]),
                                  parseInt(hour.split(":")[1]),
                                  parseInt(hour.split(":")[2])
                                )
                                ? styles.disabled
                                : null
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
                          IDR{item.premiere_price.toLocaleString("id-ID")}
                          /seat
                        </span>
                      </div>
                      {role !== "admin" && (
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => {
                            this.handleBook(item);
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
            {!premieres.length > 0 && (
              <>
                <span className={styles.emptyMessage}>
                  Sorry, there are no schedules for the selected date or
                  location.
                </span>
              </>
            )}
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

const mapDispatchToProps = { getPremieres, setBooking };

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
