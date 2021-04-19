import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Styles from "./MovieDetail.module.css";
import {
  Card,
  Col,
  Container,
  Dropdown,
  InputGroup,
  Row,
} from "react-bootstrap";
import MovieImage from "../../../assets/img/spiderman-home-coming.png";

export default class MovieDetail extends Component {
  render() {
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
                  className={`d-flex flex-column align-items-center align-items-md-start ${Styles.movieDescHead}`}
                >
                  <h1 className={`text-md-start`}>Spider-Man: Homecoming</h1>
                  <p className={`m-0 ${Styles.genre}`}>
                    Adventure, Action, Sci-Fi
                  </p>
                </div>
                <Row xs={2} className={`m-0 gy-4`}>
                  <Col xs={6} md={4} className={`p-0`}>
                    <h6 className=" ">Release date</h6>
                    <span className=" ">June 28, 2017</span>
                  </Col>
                  <Col xs={6} md={8} className={`p-0`}>
                    <h6 class=" ">Directed by</h6>
                    <span class=" ">Jon Watss</span>
                  </Col>
                  <Col md={4} className={`p-0`}>
                    <h6 class=" ">Duration</h6>
                    <span class=" ">2 hours 13 minutes </span>
                  </Col>
                  <Col md={8} className={`p-0`}>
                    <h6 class=" ">Casts</h6>
                    <span class=" ">
                      Tom Holland, Michael Keaton, Robert Downey Jr., ...
                    </span>
                  </Col>
                </Row>
                <div className={`${Styles.separator}`}></div>
                <div class="">
                  <h5>Synopsis</h5>
                  <p className={`m-0 ${Styles.synopsisDesc}`}>
                    Thrilled by his experience with the Avengers, Peter returns
                    home, where he lives with his Aunt May, under the watchful
                    eye of his new mentor Tony Stark, Peter tries to fall back
                    into his normal daily routine - distracted by thoughts of
                    proving himself to be more than just your friendly
                    neighborhood Spider-Man - but when the Vulture emerges as a
                    new villain, everything that Peter holds most important will
                    be threatened.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>

          <section
            className={`d-flex flex-column align-items-center ${Styles.showtimesTicketContainer} border`}
          >
            <h3 className={`${Styles.titleHead}`}>Showtimes and Tickets</h3>
            <div
              className={`d-flex flex-column flex-md-row ${Styles.dateAndPlacePicker}`}
            >
              {/* <InputGroup> */}
              <input
                class="form-control"
                id="date"
                name="date"
                placeholder=""
                type="date"
              />
              {/* </InputGroup> */}

              {/* <InputGroup> */}
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
              {/* </InputGroup> */}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

// export default MovieDetail;
