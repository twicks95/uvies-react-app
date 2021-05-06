import React, { Component } from "react";
import styles from "./SignUp.module.css";

import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import brandLogo from "../../../assets/img/tickitz.png";
import smallBrandLogo from "../../../assets/icons/Tickitz.svg";
import googleIcon from "../../../assets/icons/flat-color-icons_google.svg";
import facebookIcon from "../../../assets/icons/facebook-icon.svg";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userName: "",
        userEmail: "",
        userPassword: "",
        // userAgreement: false,
      },
    };
  }

  changeText = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
        // userAgreement: e.target.checked,
      },
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register(this.state.form).then((result) => {
      this.props.history.push("/sign-in");
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/sign-in");
  };

  renderButtonState = () => {
    if (this.props.auth.isLoading) {
      return (
        <Button
          variant="primary"
          className={`w-100 ${styles.btnJoin}`}
          disabled
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          type="submit"
          className={`w-100 ${styles.btnJoin}`}
        >
          Join for free now
        </Button>
      );
    }
  };

  render() {
    // console.log(this.state);
    // const { userAgreement } = this.state;
    const { isError, msg } = this.props.auth;
    return (
      <Container fluid>
        <Row className="vh-100">
          {/* ================== */}
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

            <div className={`${styles.signUpSteps}`}>
              <div className={`${styles.stepList}`}>
                <div className={`${styles.stepNumber} ${styles.activeStep}`}>
                  1
                </div>
                <span>Fill your additional details</span>
              </div>
              <div className={`${styles.stepList}`}>
                <div className={`${styles.stepNumber}`}>2</div>
                <span>Activate your account</span>
              </div>
              <div className={`${styles.stepList}`}>
                <div className={`${styles.stepNumber}`}>3</div>
                <span>Done</span>
              </div>
            </div>
          </Col>
          {/* ================ */}
          <Col
            className={`d-flex flex-column justify-content-center ${styles.formSection}`}
          >
            <Container className={"p-0"}>
              <img
                className={`${styles.brandForm}`}
                src={smallBrandLogo}
                alt="uvies logo"
              />
              <h1 className={`${styles.formTitle}`}>
                Fill your additional details
              </h1>
              <Form onSubmit={this.handleRegister}>
                <Form.Group controlId="name">
                  <Form.Label className={`${styles.formLabel}`}>
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="userName"
                    className={`${styles.formInput}`}
                    // value={userName}
                    onChange={(e) => this.changeText(e)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="email"
                  className={`${styles.inputEmailGroup}`}
                >
                  <Form.Label className={`${styles.formLabel}`}>
                    Email address
                  </Form.Label>
                  {isError && (
                    <p
                      className={`d-block mb-2 ml-2 text-danger ${styles.alertEmail}`}
                    >
                      {msg}
                    </p>
                  )}
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="off"
                    name="userEmail"
                    className={`${isError && styles.test} ${styles.formInput}`}
                    onChange={(e) => this.changeText(e)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="password"
                  className={`${styles.inputPasswordGroup}`}
                >
                  <Form.Label className={`${styles.formLabel}`}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create your password"
                    name="userPassword"
                    className={`${styles.formInput}`}
                    // value={userEmail}
                    onChange={(e) => this.changeText(e)}
                  />
                </Form.Group>
                {/* <Form.Group controlId="userAgreement">
                  <Form.Check
                    type="checkbox"
                    name="userAgreement"
                    label={"I agree to terms & conditions"}
                    onClick={(e) => this.changeText(e)}
                  />
                </Form.Group> */}
                {this.renderButtonState()}
              </Form>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.forgotPassword}`}
              >
                <p className="m-0 mr-2">Already have an account?</p>
                <a
                  href="/sign-in"
                  name="signIn"
                  className={`${styles.signIn}`}
                  onClick={this.handleClick}
                >
                  Sign in
                </a>
              </div>
              <span
                className={`d-flex justify-content-center align-items-center ${styles.orBorder}`}
              >
                Or
              </span>
              <Row xs={2} className={`${styles.socialMediaLogin}`}>
                <Col>
                  <Button
                    href="/"
                    variant="light"
                    className={`d-flex align-items-center justify-content-center ${styles.btnGoogle}`}
                  >
                    <img
                      src={googleIcon}
                      alt="google icon"
                      className={`${styles.iGoogle}`}
                    />
                    <span>Google</span>
                  </Button>
                </Col>
                <Col>
                  <Button
                    href="/"
                    variant="light"
                    className={`d-flex align-items-center justify-content-center ${styles.btnFacebook}`}
                  >
                    <img
                      src={facebookIcon}
                      alt="facebook icon"
                      className={`${styles.iFacebook}`}
                    />
                    <span>Facebook</span>
                  </Button>
                </Col>
              </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
