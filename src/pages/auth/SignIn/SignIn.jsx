import React, { Component } from "react";
import styles from "./SignIn.module.css";

import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import brandLogo from "../../../assets/img/tickitz.png";
import smallBrandLogo from "../../../assets/icons/Tickitz.svg";
import googleIcon from "../../../assets/icons/flat-color-icons_google.svg";
import facebookIcon from "../../../assets/icons/facebook-icon.svg";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    // console.log(this.props);
    this.props.login(this.state.form).then((result) => {
      // [1]
      // console.log(result.value.data.data.token);
      // [2]
      // console.log(this.props);
      // console.log(this.props.auth.data.token);
      // console.log(result);
      localStorage.setItem("token", this.props.auth.data.token);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <Container fluid>
        <Row className="vh-100">
          <Col
            xs={7}
            className={`d-flex flex-column justify-content-center align-items-center ${styles.leftBanner}`}
          >
            <img
              src={brandLogo}
              alt="uvies logo"
              className={`${styles.uviesLogo}`}
            />
            <h2>Wait, Watch, Wow!</h2>
          </Col>
          <Col
            className={`d-flex flex-column justify-content-center ${styles.signInSection}`}
          >
            <Container className={"p-0"}>
              <img
                className={`${styles.brandForm}`}
                src={smallBrandLogo}
                alt="uvies logo"
              />
              <h1 className={`${styles.signIn}`}>Sign In</h1>
              <p className={`${styles.signInMessage}`}>
                Sign in with your data that you entered during your registration
              </p>
              <Form onSubmit={this.handleLogin}>
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
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Write your password"
                    name="userPassword"
                    className={`${styles.formInput}`}
                    // value={userEmail}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 ${styles.btnSignIn}`}
                >
                  Sign In
                </Button>
              </Form>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.forgotPassword}`}
              >
                <p className="m-0 mr-2">Forgot password?</p>
                <a href="/" className={`${styles.reset}`}>
                  Reset now
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

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
