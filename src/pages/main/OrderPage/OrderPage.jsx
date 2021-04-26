import React, { Component } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import styles from "./OrderPage.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Seat from "./Seat/Seat";

import CineOne21 from "../../../assets/img/cine-one-21-logo.svg";

export class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeat: [],
      reservedSeat: ["A1", "A7", "A14"],
    };
  }

  bookingSeat = (seat) => {
    this.setState({
      selectedSeat: [...this.state.selectedSeat, seat],
    });
    console.log(seat);
  };

  render() {
    const { reservedSeat, selectedSeat } = this.state;
    return (
      <>
        <Navbar />
        <div
          className={`d-flex align-items-center justify-content-between ${styles.stickyHeadMovieSelection}`}
        >
          <p className={`m-0 ${styles.movieNameSelected}`}>
            Spider-Man: Homecoming
          </p>
          <Button variant="light" className={`${styles.changeMovieButton}`}>
            Change movie
          </Button>
        </div>
        <Container fluid as={"main"} className={`${styles.mainWrapper}`}>
          <Row xs={1} lg={2}>
            <Col lg={7}>
              <h3 className={`mb-4`}>Choose Seat</h3>
              <div className={`mb-5 ${styles.wrapper}`}>
                <div className={`${styles.chooseSeat}`}>
                  <Seat
                    seatAlphabet="A"
                    reservedSeat={reservedSeat}
                    selectedSeat={selectedSeat}
                    bookingSeat={this.bookingSeat.bind(this)}
                  />
                  <Seat
                    seatAlphabet="B"
                    reservedSeat={reservedSeat}
                    selectedSeat={selectedSeat}
                    bookingSeat={this.bookingSeat.bind(this)}
                  />
                  <Seat
                    seatAlphabet="C"
                    reservedSeat={reservedSeat}
                    selectedSeat={selectedSeat}
                    bookingSeat={this.bookingSeat.bind(this)}
                  />
                  <Seat
                    seatAlphabet="D"
                    reservedSeat={reservedSeat}
                    selectedSeat={selectedSeat}
                    bookingSeat={this.bookingSeat.bind(this)}
                  />
                  <Seat
                    seatAlphabet="E"
                    reservedSeat={reservedSeat}
                    selectedSeat={selectedSeat}
                    bookingSeat={this.bookingSeat.bind(this)}
                  />
                  <Seat
                    seatAlphabet="F"
                    reservedSeat={reservedSeat}
                    selectedSeat={selectedSeat}
                    bookingSeat={this.bookingSeat.bind(this)}
                  />
                  <Seat
                    seatAlphabet="G"
                    reservedSeat={reservedSeat}
                    selectedSeat={selectedSeat}
                    bookingSeat={this.bookingSeat.bind(this)}
                  />
                </div>
                <div className={`mt-5 ${styles.seatingKeys}`}>
                  <p>Seating key</p>
                  <div
                    className={`d-flex justify-content-center ${styles.seatingKeyGroup}`}
                  >
                    <div className={`d-flex mr-4 ${styles.key}`}>
                      <div
                        className={`mr-2 ${styles.availability} ${styles.available}`}
                      ></div>
                      Available
                    </div>
                    <div className={`d-flex mr-4 ${styles.key}`}>
                      <div
                        className={`mr-2 ${styles.availability} ${styles.selected}`}
                      ></div>
                      Selected
                    </div>
                    <div className={`d-flex mr-4 ${styles.key}`}>
                      <div
                        className={`mr-2 ${styles.availability} ${styles.loveNest}`}
                      ></div>
                      Love Nest
                    </div>
                    <div className={`d-flex mr-4 ${styles.key}`}>
                      <div
                        className={`mr-2 ${styles.availability} ${styles.sold}`}
                      ></div>
                      Sold
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`d-flex flex-column flex-md-row justify-content-between ${styles.orderActionButton}`}
              >
                <Button variant={"outline-primary"} className={`mb-3 mb-md-0`}>
                  Change your movie
                </Button>
                <Button variant={"primary"}>Check out now</Button>
              </div>
            </Col>
            <Col lg={5}>
              <h3 className={`mb-4`}>Order Info</h3>
              <div
                className={`d-flex flex-column justify-items-center ${styles.wrapper} ${styles.orderInfo}`}
              >
                <div
                  className={`d-flex justify-content-center ${styles.cinemaLogoWrapper}`}
                >
                  <img src={CineOne21} alt="premiere" className={`mb-2`} />
                </div>
                <h4 className={`d-flex justify-content-center mb-4`}>
                  ConeOne21 Cinema
                </h4>
                <div className={`${styles.orderDetail}`}>
                  <ListGroup>
                    <ListGroup.Item
                      className={`d-flex justify-content-between border-0`}
                    >
                      Movie selected
                      <span>Spider-Man: Homecoming</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className={`d-flex justify-content-between border-0`}
                    >
                      Tuesday, 07 July 2020<span>02:00pm</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className={`d-flex justify-content-between border-0`}
                    >
                      One ticket price<span>$10</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className={`d-flex justify-content-between border-0`}
                    >
                      Seat choosed<span>C4, C5, C6</span>
                    </ListGroup.Item>
                    <div className={`my-4 ${styles.divider}`}></div>
                    <ListGroup.Item
                      className={`d-flex justify-content-between border-0`}
                    >
                      Total payment<span>$30</span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default OrderPage;
