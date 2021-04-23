import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import styles from "./PaymentPage.module.css";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

import googlePlayLogo from "../../../assets/img/gplay-logo.svg";
import visaLogo from "../../../assets/img/visa-logo.svg";
import gopayLogo from "../../../assets/img/gopay-logo.svg";
import paypalLogo from "../../../assets/img/paypal-logo.svg";
import danaLogo from "../../../assets/img/dana-logo.svg";
import bcaLogo from "../../../assets/img/bca-logo.svg";
import briLogo from "../../../assets/img/bri-logo.svg";
import ovoLogo from "../../../assets/img/ovo-logo.svg";

export default class PaymentPage extends Component {
  render() {
    return (
      <>
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
                      Date & time
                      <span className={`${styles.detail}`}>
                        Tuesday, 07 July 2020 at 02:00pm
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                    >
                      Movie title
                      <span className={`${styles.detail}`}>
                        Spider-Man: Homecoming
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                    >
                      Cinema name
                      <span className={`${styles.detail}`}>
                        CineOne21 Cinema
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                    >
                      Number of tickets
                      <span className={`${styles.detail}`}>3 pieces</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className={`d-flex justify-content-between align-items-center px-0 ${styles.listGroupItem}`}
                    >
                      Total payment
                      <span className={`${styles.detailPrice}`}>$30,00</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
              <div className={`${styles.paymentMethodContainer}`}>
                <h4>Choose a Payment Method</h4>
                <Card className={`${styles.paymentMethod}`}>
                  <Row xs={3} md={4} className={`${styles.aRow}`}>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={googlePlayLogo} alt="Google Play"></img>
                      </Button>
                    </Col>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={visaLogo} alt="Google Play"></img>
                      </Button>
                    </Col>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={gopayLogo} alt="Google Play"></img>
                      </Button>
                    </Col>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={paypalLogo} alt="Google Play"></img>
                      </Button>
                    </Col>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={danaLogo} alt="Google Play"></img>
                      </Button>
                    </Col>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={bcaLogo} alt="Google Play"></img>
                      </Button>
                    </Col>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={briLogo} alt="Google Play"></img>
                      </Button>
                    </Col>
                    <Col className={`${styles.colPadding}`}>
                      <Button
                        variant="outline-secondary"
                        className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                      >
                        <img src={ovoLogo} alt="Google Play"></img>
                      </Button>
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
                  >
                    Previous step
                  </Button>
                  <Button variant={"primary"}>Pay your order</Button>
                </div>
              </div>
            </Col>

            <Col xs={12} lg={5} className={`p-0 ${styles.personalInfoContainer}`}>
              <h4>Personal Info</h4>
              <Card className={`${styles.personalInfo}`}>
                <Container className={`p-0 ${styles.personalInfoFormContainer}`}>
                  <div>
                    <label for="exampleInputPassword1" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      value="Jonas El Rodriguez"
                    />
                  </div>
                  <div>
                    <label for="exampleInputPassword1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputPassword1"
                      value="jonasrodri123@gmail.com"
                    />
                  </div>
                  <div>
                    <label for="exampleInputPassword1" className="form-label">
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
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value="81445687121"
                      />
                    </div>
                  </div>
                  <div className={`alert alert-warning m-0 ${styles.dataAlertMessage}`} role="alert">
                    <i className={`bi bi-exclamation-triangle-fill text-warning ${styles.iWarning}`}></i>
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
  }
}
