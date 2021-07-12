import React, { Component } from "react";
import styles from "./AccountActivation.module.css";

import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import brandLogo from "../../../assets/img/tickitz.png";
import smallBrandLogo from "../../../assets/icons/Tickitz.svg";
import axiosApiInstances from "../../../utils/axios";
import { Link } from "react-router-dom";

class AccountActivation extends Component {
  constructor(props) {
    super(props);
    this.state = { success: false, message: "" };
  }

  componentDidUpdate = () => {};

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register(this.state.form).then((result) => {
      this.props.history.push("/account/activation");
    });
  };

  handleResendEmail = () => {
    const userId = localStorage.getItem("user_id");
    const userEmail = localStorage.getItem("user_email");
    axiosApiInstances
      .post(`auth/resend/email?userEmail=${userEmail}&userId=${userId}`)
      .then((res) => {
        this.setState({
          ...this.state,
          success: true,
          message: "Email has sent, please check your inbox.",
        });
      });
  };

  render() {
    return (
      <Container fluid className={styles.container}>
        <Row className="vh-100">
          <Col
            xs={7}
            className={`d-flex flex-column justify-content-center ${styles.leftBanner}`}
          >
            <img
              src={brandLogo}
              alt="uvies logo"
              className={`${styles.uviesLogo}`}
            />

            <h2>Let's build your account</h2>
            <p>
              To be a loyal moviegoer and access all of features, your details
              are required.
            </p>
            <Button>as</Button>
            <Spinner />
            <div className={`${styles.signUpSteps}`}>
              <div className={`${styles.stepList}`}>
                <div className={`${styles.stepNumber}`}>1</div>
                <span>Fill your additional details</span>
              </div>
              <div className={`${styles.stepList}`}>
                <div className={`${styles.stepNumber} ${styles.activeStep}`}>
                  2
                </div>
                <span>Activate your account</span>
              </div>
              <div className={`${styles.stepList}`}>
                <div className={`${styles.stepNumber}`}>3</div>
                <span>Done</span>
              </div>
            </div>
          </Col>
          <Col
            className={`d-flex flex-column justify-content-start ${styles.rightSection}`}
          >
            <Container className={"p-0"}>
              <img
                className={`${styles.brandForm}`}
                src={smallBrandLogo}
                alt="uvies logo"
              />
              <h1 className={`${styles.title}`}>Activate your account</h1>
              <p>
                We have sent a link to your registered email. Click the link,
                and your account will be activated very soon.
              </p>
              <span>Didn't receive any email?</span>
              <Link
                className={styles.resendLink}
                onClick={this.handleResendEmail}
              >
                Resend activation link
              </Link>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(AccountActivation);
