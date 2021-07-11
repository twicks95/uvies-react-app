import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import styles from "./PaymentPage.module.css";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import googlePayLogo from "../../../assets/img/gplay-logo.svg";
import visaLogo from "../../../assets/img/visa-logo.svg";
import gopayLogo from "../../../assets/img/gopay-logo.svg";
import paypalLogo from "../../../assets/img/paypal-logo.svg";
import danaLogo from "../../../assets/img/dana-logo.svg";
import bcaLogo from "../../../assets/img/bca-logo.svg";
import briLogo from "../../../assets/img/bri-logo.svg";
import ovoLogo from "../../../assets/img/ovo-logo.svg";
import { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import axiosApiInstances from "../../../utils/axios";
import { CheckCircleIcon } from "@heroicons/react/solid";

const PaymentPage = (props) => {
  const [name, setName] = useState(props.user.data.user_name);
  const [email, setEmail] = useState(props.user.data.user_email);
  const [phone, setPhone] = useState(props.user.data.user_phone_number);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showModal, setShowModal] = useState(false);

  const userId = props.user.data.user_id;
  const movie = localStorage.getItem("movie");
  // const movieId = localStorage.getItem("movieId");
  const premiere = localStorage.getItem("premiere");
  const premiereId = localStorage.getItem("premiereId");
  // const locationId = localStorage.getItem("locationId");
  const scheduleId = localStorage.getItem("scheduleId");
  const date = localStorage.getItem("date");
  const hour = localStorage.getItem("hour");
  const totalPayment = localStorage.getItem("totalPayment");
  const seat = localStorage.getItem("seat")
    ? localStorage.getItem("seat").split(",")
    : [];

  const handlePay = () => {
    if (premiereId) {
      const data = {
        userId: parseInt(userId),
        premiereId: parseInt(premiereId),
        scheduleId: parseInt(scheduleId),
        bookingTicket: seat.length,
        bookingTotalPrice: parseInt(totalPayment),
        bookingPaymentMethod: paymentMethod,
        bookingStatus: "Approved",
        bookingSeat: seat,
      };

      axiosApiInstances.post("booking", data).then((res) => {
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
        setShowModal(true);
        window.setTimeout(() => {
          props.history.push(
            `/user/booking/ticket?bookingId=${res.data.data.id}`
          );
        }, 3000);
      });
    }
  };

  return (
    <>
      <Modal size="md" show={showModal} centered>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center pt-0 pb-5">
          <h4
            style={{
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            SUCCESS
          </h4>
          <CheckCircleIcon
            style={{
              color: "#2f702f",
              height: "50px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          />
          <p style={{ textAlign: "center", width: "80%" }}>
            You have just booked your ticket and your payment is in process.
          </p>
          <span>Thank you!</span>
        </Modal.Body>
      </Modal>
      <Navbar />
      <Container
        fluid
        as={"main"}
        className={`p-0 ${styles.paymentDetailContainer}`}
      >
        <Row xs={1} lg={2}>
          <Col xs={12} lg={7} className={`p-0 ${styles.paymentColumn}`}>
            <div className={`${styles.paymentInfoContainer}`}>
              <h4>Payment Info</h4>
              <Card className={`${styles.paymentInfo}`}>
                <ListGroup as="ul">
                  <ListGroup.Item
                    as="li"
                    className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                  >
                    {`Date & time`}
                    <span className={`${styles.detail}`}>
                      {date ? moment(date).format("dddd, DD MMMM YYYY") : "-"}{" "}
                      at{" "}
                      {hour
                        ? moment(`2021-12-12 ${hour}`)
                            .format("LT")
                            .toLowerCase()
                        : "-"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                  >
                    Movie title
                    <span className={`${styles.detail}`}>
                      {movie ? movie : "No Movie Selected"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                  >
                    Cinema name
                    <span className={`${styles.detail}`}>
                      {premiere ? premiere : "-"} Cinema
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                  >
                    Number of tickets
                    <span className={`${styles.detail}`}>
                      {seat.length > 0 ? seat.length : "0"} pieces
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                  >
                    Total payment
                    <span className={`${styles.detailPrice}`}>
                      IDR{parseInt(totalPayment).toLocaleString("id-ID")}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div className={`${styles.paymentMethodContainer}`}>
              <h4>Choose a Payment Method</h4>
              <Card className={`${styles.paymentMethod}`}>
                <Row xs={3} md={4} className={`${styles.aRow}`}>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="Google Pay"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img
                          id="Google Pay"
                          src={googlePayLogo}
                          alt="Google Play"
                        ></img>
                      </Button>
                    </div>
                  </Col>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="VISA"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img id="VISA" src={visaLogo} alt="Google Play"></img>
                      </Button>
                    </div>
                  </Col>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="GoPay"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img id="GoPay" src={gopayLogo} alt="Google Play"></img>
                      </Button>
                    </div>
                  </Col>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="Paypal"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img
                          id="Paypal"
                          src={paypalLogo}
                          alt="Google Play"
                        ></img>
                      </Button>
                    </div>
                  </Col>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="Dana"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img id="Dana" src={danaLogo} alt="Google Play"></img>
                      </Button>
                    </div>
                  </Col>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="BCA"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img id="BCA" src={bcaLogo} alt="Google Play"></img>
                      </Button>
                    </div>
                  </Col>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="BRI"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img id="BRI" src={briLogo} alt="Google Play"></img>
                      </Button>
                    </div>
                  </Col>
                  <Col className={`${styles.colPadding}`}>
                    <div>
                      <Button
                        variant="outline-secondary"
                        id="OVO"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                        onClick={(e) => setPaymentMethod(e.target.id)}
                      >
                        <img id="OVO" src={ovoLogo} alt="Google Play"></img>
                      </Button>
                    </div>
                  </Col>
                </Row>
                <span
                  className={`d-flex justify-content-center align-items-center ${styles.orSeparator}`}
                >
                  or
                </span>
                <p className="text-center">
                  Pay via cash.
                  <a className="text-decoration-none" href="/">
                    {" "}
                    See how it work
                  </a>
                </p>
              </Card>
              <div
                className={`d-flex flex-column flex-lg-row justify-content-between ${styles.btnPaymentGroup}`}
              >
                <Button
                  variant={"outline-primary"}
                  className={`d-none d-lg-inline-block`}
                  onClick={() => props.history.push("/order")}
                >
                  Previous step
                </Button>
                <Button variant={"primary"} onClick={handlePay}>
                  Pay your order
                </Button>
              </div>
            </div>
          </Col>

          <Col xs={12} lg={5} className={`p-0 ${styles.personalInfoContainer}`}>
            <h4>Personal Info</h4>
            <Card className={`${styles.personalInfo}`}>
              <Container className={`p-0 ${styles.personalInfoFormContainer}`}>
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control shadow-none"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <span
                      className={`input-group-text bg-transparent ${styles.regionPhoneCode}`}
                      id="basic-addon1"
                    >
                      +62
                    </span>
                    <input
                      type="text"
                      id="phone"
                      pattern="0-9"
                      className={`form-control shadow-none ${styles.phoneNumber}`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  className={`alert alert-warning m-0 ${styles.dataAlertMessage}`}
                  role="alert"
                >
                  <i
                    className={`bi bi-exclamation-triangle-fill text-warning ${styles.iWarning}`}
                  ></i>
                  Fill your data correctly.
                </div>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(PaymentPage);
