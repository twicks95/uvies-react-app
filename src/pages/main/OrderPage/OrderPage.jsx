/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import styles from "./OrderPage.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Seat from "./Seat/Seat";
import CineOne from "../../../assets/img/cine-one-21-logo.svg";
import Ebv from "../../../assets/img/ebu-id-logo.svg";
import Hiflix from "../../../assets/img/hiflix-logo.svg";
import { useEffect, useState } from "react";
import moment from "moment";
import axiosApiInstances from "../../../utils/axios";

const OrderPage = (props) => {
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const movie = localStorage.getItem("movie");
  const premiere = localStorage.getItem("premiere");
  const premiereId = localStorage.getItem("premiereId");
  const date = localStorage.getItem("date");
  const hour = localStorage.getItem("hour");
  const price = localStorage.getItem("price");

  useEffect(() => {
    localStorage.getItem("seat")
      ? setSelectedSeat(localStorage.getItem("seat").split(","))
      : setSelectedSeat([]);

    axiosApiInstances
      .get(`schedule/premiere/clock?premiereId=${premiereId}&clock=${hour}`)
      .then((res) => {
        localStorage.setItem("scheduleId", res.data.data[0].schedule_id);
      });

    axiosApiInstances.get(`booking/seat/booked/${premiereId}`).then((res) => {
      let reservedSeat = [];
      for (const i of res.data.data) {
        reservedSeat.push(i.booking_seat_location);
      }
      setReservedSeat(reservedSeat);
    });
  }, []);

  const bookingSeat = (seat) => {
    setSelectedSeat([...selectedSeat, seat]);
  };

  const removeSeat = (index) => {
    setSelectedSeat(selectedSeat.splice(index, 1));
  };

  const handleResetBooking = () => {
    localStorage.removeItem("totalPayment");
    localStorage.removeItem("seat");
    localStorage.removeItem("movie");
    localStorage.removeItem("movieId");
    localStorage.removeItem("date");
    localStorage.removeItem("hour");
    localStorage.removeItem("premiere");
    localStorage.removeItem("premiereId");
    localStorage.removeItem("price");
    localStorage.removeItem("scheduleId");
    localStorage.removeItem("locationId");
  };

  return (
    <>
      <Navbar />
      <div
        className={`d-flex align-items-center justify-content-between ${styles.stickyHeadMovieSelection}`}
      >
        <p className={`m-0 ${styles.movieNameSelected}`}>
          {movie ? movie : "No Movie Selected..."}
        </p>
        <Button
          variant="light"
          className={`${styles.changeMovieButton}`}
          onClick={() => {
            handleResetBooking();
            props.history.push("/");
          }}
        >
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
                  bookingSeat={bookingSeat}
                  removeSeat={removeSeat}
                />
                <Seat
                  seatAlphabet="B"
                  reservedSeat={reservedSeat}
                  selectedSeat={selectedSeat}
                  bookingSeat={bookingSeat}
                  removeSeat={removeSeat}
                />
                <Seat
                  seatAlphabet="C"
                  reservedSeat={reservedSeat}
                  selectedSeat={selectedSeat}
                  bookingSeat={bookingSeat}
                  removeSeat={removeSeat}
                />
                <Seat
                  seatAlphabet="D"
                  reservedSeat={reservedSeat}
                  selectedSeat={selectedSeat}
                  bookingSeat={bookingSeat}
                  removeSeat={removeSeat}
                />
                <Seat
                  seatAlphabet="E"
                  reservedSeat={reservedSeat}
                  selectedSeat={selectedSeat}
                  bookingSeat={bookingSeat}
                  removeSeat={removeSeat}
                />
                <Seat
                  seatAlphabet="F"
                  reservedSeat={reservedSeat}
                  selectedSeat={selectedSeat}
                  bookingSeat={bookingSeat}
                  removeSeat={removeSeat}
                />
                <Seat
                  seatAlphabet="G"
                  reservedSeat={reservedSeat}
                  selectedSeat={selectedSeat}
                  bookingSeat={bookingSeat}
                  removeSeat={removeSeat}
                />
              </div>
              <div className={`mt-5 ${styles.seatingKeys}`}>
                <p>Seating key</p>
                <div
                  className={`d-flex justify-content-center ${styles.seatingKeyGroup}`}
                >
                  <div className={`d-flex me-4 ${styles.key}`}>
                    <div
                      className={`me-2 ${styles.availability} ${styles.available}`}
                    ></div>
                    Available
                  </div>
                  <div className={`d-flex me-4 ${styles.key}`}>
                    <div
                      className={`me-2 ${styles.availability} ${styles.selected}`}
                    ></div>
                    Selected
                  </div>
                  <div className={`d-flex me-4 ${styles.key}`}>
                    <div
                      className={`me-2 ${styles.availability} ${styles.loveNest}`}
                    ></div>
                    Love Nest
                  </div>
                  <div className={`d-flex me-4 ${styles.key}`}>
                    <div
                      className={`me-2 ${styles.availability} ${styles.sold}`}
                    ></div>
                    Sold
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`d-flex flex-column flex-md-row justify-content-between ${styles.orderActionButton}`}
            >
              <Button
                variant={"outline-primary"}
                className={`mb-3 mb-md-0`}
                onClick={() => {
                  handleResetBooking();
                  props.history.push("/");
                }}
              >
                Change your movie
              </Button>
              <Button
                variant={"primary"}
                onClick={() => {
                  const total = document.getElementById("total-payment");
                  let res = total.textContent.slice(3).replace(".", "");
                  if (res.indexOf(".") >= 0) {
                    res = res.replace(".", "");
                  }
                  localStorage.setItem("totalPayment", res);
                  localStorage.setItem("seat", selectedSeat);
                  props.history.push("/payment");
                }}
              >
                Check out now
              </Button>
            </div>
          </Col>
          <Col lg={5}>
            <h3 className={`mb-4 mt-5 mt-lg-0`}>Order Info</h3>
            <div
              className={`d-flex flex-column justify-items-center ${styles.wrapper} ${styles.orderInfo}`}
            >
              <div
                className={`d-flex justify-content-center ${styles.cinemaLogoWrapper}`}
              >
                <img
                  src={
                    premiere === "Ebv.id"
                      ? Ebv
                      : premiere === "Hiflix"
                      ? Hiflix
                      : CineOne
                  }
                  alt="premiere"
                  className={`mb-2`}
                />
              </div>
              <h4 className={`d-flex justify-content-center mb-4`}>
                {premiere ? premiere : "-"} Cinema
              </h4>
              <div className={`${styles.orderDetail}`}>
                <ListGroup>
                  <ListGroup.Item
                    className={`d-flex justify-content-between border-0`}
                  >
                    Movie selected
                    <span
                      title={movie}
                      style={{
                        overflow: "hidden",
                        width: "40%",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {movie ? movie : "No Movie Selected..."}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`d-flex justify-content-between border-0`}
                  >
                    {date ? moment(date).format("dddd, DD MMMM YYYY") : "-"}
                    <span>
                      {hour
                        ? moment(`2021-12-12 ${hour}`)
                            .format("LT")
                            .toLowerCase()
                        : "-"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`d-flex justify-content-between border-0`}
                  >
                    One ticket price
                    <span>IDR{parseInt(price).toLocaleString("id-ID")}</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`d-flex justify-content-between border-0`}
                  >
                    Seat choosed
                    <span style={{ textAlign: "right", width: "40%" }}>
                      {selectedSeat.length > 0
                        ? selectedSeat
                            .sort()
                            .map((item, index) =>
                              index > 0 ? `, ${item}` : item
                            )
                        : "No seat choosen"}
                    </span>
                  </ListGroup.Item>
                  <div className={`my-4 ${styles.divider}`}></div>
                  <ListGroup.Item
                    className={`d-flex justify-content-between border-0`}
                  >
                    Total payment
                    <span id="total-payment">
                      IDR
                      {(parseInt(price) * selectedSeat.length).toLocaleString(
                        "id-ID"
                      )}
                    </span>
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
};

export default OrderPage;
