import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { resetBooking } from "../../../redux/actions/booking";
import axiosApiInstances from "../../../utils/axios";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
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
import { CheckCircleIcon } from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/outline";

const PaymentPage = (props) => {
  const [name, setName] = useState(props.user.data.user_name);
  const [email, setEmail] = useState(props.user.data.user_email);
  const [phone, setPhone] = useState(props.user.data.user_phone_number);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {
    hour,
    movieName,
    premiereName,
    premiereId,
    scheduleId,
    schedule,
    seat = [],
    totalPayment,
  } = props.booking.detail;
  const userId = props.user.data.user_id;

  useEffect(() => {
    if (!props.booking.detail.scheduleId) {
      document.getElementById("btn-previous").disabled = true;
    }
  });

  const handlePay = () => {
    if (premiereId && scheduleId && seat.length > 0 && totalPayment) {
      const data = {
        userId: parseInt(userId),
        premiereId: parseInt(premiereId),
        scheduleId: parseInt(scheduleId),
        bookingTicket: seat.length,
        bookingTotalPrice: parseInt(totalPayment),
        bookingPaymentMethod: paymentMethod,
        bookingStatus: "Approved",
        bookingSeat: seat,
        bookingDate: schedule,
      };

      axiosApiInstances.post("booking", data).then((res) => {
        props.resetBooking();
        setShowModal(true);
        window.setTimeout(() => {
          props.history.push(
            `/user/booking/ticket?bookingId=${res.data.data.id}`
          );
        }, 4000);
      });
    }
  };

  return (
    <>
      <Modal size="md" show={showModal} centered>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center py-5">
          <div className="d-flex align-items-center">
            <h4
              style={{
                fontSize: "28px",
                fontWeight: "700",
                letterSpacing: ".75px",
                margin: "0",
              }}
            >
              Success
            </h4>
            <span>
              <CheckCircleIcon
                style={{
                  color: "#2f702f",
                  height: "22px",
                  marginRight: "5px",
                  position: "relative",
                  top: "-16px",
                }}
              />
            </span>
          </div>

          <TicketIcon className={`my-4 ${styles.ticketIcon}`} />
          <p style={{ textAlign: "center", width: "80%" }}>
            You have just booked your ticket and your payment is in process.
          </p>
          <span style={{ fontWeight: "600" }}>Thank you!</span>
        </Modal.Body>
      </Modal>
      <Navbar />
      <Container
        fluid
        as={"main"}
        className={`p-0 ${styles.paymentDetailContainer}`}
      >
        <Row xs={1} lg={2} className="g-5">
          <Col xs={12} lg={7} className={styles.paymentColumn}>
            <div className={styles.paymentInfoContainer}>
              <h4>Payment Info</h4>
              <Card className={styles.paymentInfo}>
                <ListGroup as="ul">
                  <ListGroup.Item
                    as="li"
                    className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-0 ${styles.listGroupItem}`}
                  >
                    {`Date & time`}
                    <span className={styles.detail}>
                      {schedule
                        ? moment(schedule).format("dddd, DD MMMM YYYY")
                        : "-"}{" "}
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
                    className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-0 ${styles.listGroupItem}`}
                  >
                    Movie title
                    <span className={styles.detail}>
                      {movieName ? movieName : "No Movie Selected"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-0 ${styles.listGroupItem}`}
                  >
                    Cinema name
                    <span className={styles.detail}>
                      {premiereName ? premiereName : "-"} Cinema
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-0 ${styles.listGroupItem}`}
                  >
                    Number of tickets
                    <span className={styles.detail}>
                      {seat.length > 0 ? seat.length : "0"} pieces
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-0 ${styles.listGroupItem}`}
                  >
                    Total payment
                    <span className={styles.detailPrice}>
                      IDR{parseInt(totalPayment).toLocaleString("id-ID")}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <PaymentMethod setPaymentMethod={setPaymentMethod} />
            <div
              className={`d-flex flex-column flex-lg-row justify-content-between gap-4 ${styles.btnPaymentGroup}`}
            >
              <Button
                id="btn-previous"
                variant={"outline-primary"}
                onClick={() => props.history.push("/order")}
              >
                Previous step
              </Button>
              <Button variant={"primary"} onClick={handlePay}>
                Pay your order
              </Button>
            </div>
          </Col>

          <Col xs={12} lg={5} className={styles.personalInfoContainer}>
            <div>
              <h4>Personal Info</h4>
              <Card className={styles.personalInfo}>
                <Container
                  className={`p-0 ${styles.personalInfoFormContainer}`}
                >
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
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  booking: state.booking,
});
const mapDispatchToProps = { resetBooking };
export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
