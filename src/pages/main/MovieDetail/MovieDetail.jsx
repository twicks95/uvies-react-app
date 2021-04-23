import React, { Component } from "react";
import axiosApiIntances from "../../../utils/axios";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Styles from "./MovieDetail.module.css";
import { Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import MovieImage from "../../../assets/img/spiderman-home-coming.png";
import qs from "query-string";
import moment from "moment";
import "moment-duration-format"

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: "",
      movieGenre: "",
      movieRelease: "",
      movieDirector: "",
      movieDuration: "",
      movieCasts: "",
      movieSynopsis: "",
    };
  }

  componentDidMount() {
    const urlParam = qs.parse(this.props.location.search);
    const movieId = urlParam.movieId;
    this.getDataMovie(movieId);
  }

  getDataMovie = (id) => {
    axiosApiIntances
      .get(`movie/${id}`)
      .then((res) => {
        this.setState({
          // data: res.data.data[0],
          movieName: res.data.data[0].movie_name,
          movieGenre: res.data.data[0].movie_category,
          movieRelease: res.data.data[0].movie_release_date,
          movieDirector: res.data.data[0].movie_director,
          movieDuration: res.data.data[0].movie_duration,
          movieCasts: res.data.data[0].movie_casts,
          movieSynopsis: res.data.data[0].movie_synopsis,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    // const { data } = this.state;
    // console.log(data.movie_name);

    const {
      movieName,
      movieGenre,
      movieRelease,
      movieDirector,
      movieDuration,
      movieCasts,
      movieSynopsis,
    } = this.state;

    return (
      <>
        <Navbar />
        <main className={`${Styles.mainWrapper}`}>
          <Container fluid className={`${Styles.movieDetails}`}>
            <Row xs={1} md={2} className={`g-0`}>
              <Col md={3} lg={4} className={`${Styles.moviePosterContainer}`}>
                <Card className={`${Styles.moviePoster}`}>
                  <Card.Img
                    variant="top"
                    src={MovieImage}
                    className={`${Styles.movieImg}`}
                  />
                </Card>
              </Col>
              <Col md={9} lg={8} className={`${Styles.movieDescContainer}`}>
                <div
                  className={`d-flex flex-column align-items-center align-items-md-start mb-5 ${Styles.movieDescHead}`}
                >
                  <h1 className={`text-md-start`}>{movieName}</h1>
                  <p className={`m-0 ${Styles.genre}`}>{movieGenre}</p>
                </div>
                <Row xs={2} className={`m-0`}>
                  <Col xs={6} md={4} className={`mb-3 p-0`}>
                    <h6 className=" ">Release date</h6>
                    <span className=" ">{moment(movieRelease).format('ll')}</span>
                  </Col>
                  <Col xs={6} md={8} className={`mb-3 p-0`}>
                    <h6 className=" ">Directed by</h6>
                    <span className=" ">{movieDirector}</span>
                  </Col>
                  <Col md={4} className={`p-0`}>
                    <h6 className=" ">Duration</h6>
                    <span className=" ">{moment.duration(movieDuration).format("h [hour] m [minute]")}</span>
                  </Col>
                  <Col md={8} className={`p-0`}>
                    <h6 className=" ">Casts</h6>
                    <span className=" ">{movieCasts}</span>
                  </Col>
                </Row>
                <div className={`${Styles.separator}`}></div>
                <div className="">
                  <h5>Synopsis</h5>
                  <p className={`m-0 ${Styles.synopsisDesc}`}>
                    {movieSynopsis}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>

          <section
            className={`d-flex flex-column align-items-center ${Styles.showtimesTicketContainer}`}
          >
            <h3 className={`${Styles.titleHead}`}>Showtimes and Tickets</h3>
            <div
              className={`d-flex flex-column flex-md-row ${Styles.dateAndPlacePicker}`}
            >
              <input
                className="form-control mr-md-4 mb-3 mb-md-0"
                id="date"
                name="date"
                placeholder=""
                type="date"
              />
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                  className={`d-flex align-items-center justify-content-between`}
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
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
