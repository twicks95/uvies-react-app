import React, { Component } from "react";
import styles from "./SignUp.module.css";

import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import brandLogo from "../../../assets/img/tickitz.png";
import smallBrandLogo from "../../../assets/icons/Tickitz.svg";
import googleIcon from "../../../assets/icons/flat-color-icons_google.svg";
import facebookIcon from "../../../assets/icons/facebook-icon.svg";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
        userAgreement: "",
      },
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
        [event.target.name]: event.target.checked,
      },
    });
  };

  handleRegister = (event) => {
    event.preventDefault();
    this.props.register(this.state.form).then((result) => {
      // [1]
      // console.log(result.value.data.data.token);
      // [2]
      // console.log(this.props);
      console.log(this.props.auth.data.token);
      // console.log(result);
      localStorage.setItem("token", this.props.auth.data.token);
      this.props.history.push("/learning/basic-home");
    });
  };

  render() {
    console.log(this.state);
    const { userAgreement } = this.state;
    return (
      <Container fluid>
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
                <Form.Group
                  controlId="email"
                  className={`${styles.inputEmailGroup}`}
                >
                  <Form.Label className={`${styles.formLabel}`}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Write your email"
                    name="userEmail"
                    className={`${styles.formInput}`}
                    // value={userEmail}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="password"
                  className={`${styles.inputPasswordGroup}`}
                >
                  <Form.Label className={`${styles.formLabel}`}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Write your password"
                    name="userEmail"
                    className={`${styles.formInput}`}
                    // value={userEmail}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Form.Group controlId="userAgreement">
                  <Form.Check
                    type="checkbox"
                    name="userAgreement"
                    label={"I agree to terms & conditions"}
                    onClick={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 ${styles.btnSignIn}`}
                >
                  Join for free now
                </Button>
              </Form>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.forgotPassword}`}
              >
                <p className="m-0 mr-2">Already have an account?</p>
                <a href="/" className={`${styles.reset}`}>
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

connect(mapStateToProps, mapDispatchToProps)(SignUp);
