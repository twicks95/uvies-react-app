import React, { Component } from "react";
import styles from "./AccountActivation.module.css";

import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import brandLogo from "../../../assets/icons/uvies-white.svg";
import smallBrandLogo from "../../../assets/icons/uvies-blue.svg";
import axiosApiInstances from "../../../utils/axios";
import { Link } from "react-router-dom";
import qs from "query-string";

class AccountActivation extends Component {
  constructor(props) {
    super(props);
    this.state = { activateSuccess: false, resendSuccess: false, message: "" };
  }

  componentDidMount = () => {
    const { status } = qs.parse(this.props.history.location.search);
    const userStatus =
      this.props.auth.data.user_verification ||
      localStorage.getItem("user_verification");

    if (status === "activating" && !userStatus) {
      const userId = this.props.auth.data.id || this.props.auth.data.user_id;
      axiosApiInstances.patch(`user/activate/${userId}`).then((result) => {
        this.setState({ ...this.state, activateSuccess: true });
        localStorage.setItem(
          "user_verification",
          result.data.data.user_verification
        );
      });
    } else if (userStatus) {
      this.setState({ ...this.state, activateSuccess: true });
    }
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register(this.state.form).then((result) => {
      this.props.history.push("/account/activation");
    });
  };

  handleResendEmail = () => {
    const userEmail = this.props.auth.data.user_email;
    axiosApiInstances
      .post(`auth/resend/email?userEmail=${userEmail}`)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          resendSuccess: true,
          message: "Email has sent, please check your inbox.",
        });
      });
  };

  render() {
    const { activateSuccess, resendSuccess } = this.state;

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
            <Spinner />
            <div className={`${styles.signUpSteps}`}>
              <div className={`${styles.stepList}`}>
                <div className={`${styles.stepNumber}`}>1</div>
                <span>Fill your additional details</span>
              </div>
              <div className={`${styles.stepList}`}>
                <div
                  className={`${styles.stepNumber} ${
                    !activateSuccess && styles.activeStep
                  }`}
                >
                  2
                </div>
                <span>Activate your account</span>
              </div>
              <div className={`${styles.stepList}`}>
                <div
                  className={`${styles.stepNumber} ${
                    activateSuccess && styles.activeStep
                  }`}
                >
                  3
                </div>
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
              {!activateSuccess ? (
                <>
                  <h1 className={`${styles.title}`}>Activate your account</h1>
                  <p>
                    We have sent a link to your email. Click the link, and your
                    account will be activated very soon.
                  </p>
                  <span>
                    Didn't receive any email? Try to
                    <br />
                  </span>
                  <Link
                    className={styles.resendLink}
                    onClick={this.handleResendEmail}
                  >
                    Resend activation link
                  </Link>
                  {resendSuccess && (
                    <Alert
                      variant="success"
                      style={{ fontSize: "1.4em", fontWeight: "600" }}
                      className="mt-4"
                    >
                      {this.state.message}
                    </Alert>
                  )}
                </>
              ) : (
                <>
                  <h1 className={`${styles.title}`}>Success!</h1>
                  <p>Your account is activated.</p>
                  <Link to="/sign-in">Sign In</Link>
                </>
              )}
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
