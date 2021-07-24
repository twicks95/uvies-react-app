import React, { Component } from "react";
import styles from "./SignIn.module.css";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";
import { getUserData } from "../../../redux/actions/user";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import brandLogo from "../../../assets/icons/uvies-white.svg";
import smallBrandLogo from "../../../assets/icons/uvies-blue.svg";
import googleIcon from "../../../assets/icons/flat-color-icons_google.svg";
import facebookIcon from "../../../assets/icons/facebook-icon.svg";
import { XCircleIcon } from "@heroicons/react/solid";
import { withRouter } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      isError: false,
    };
  }

  changeText = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, isError: false });

    this.props
      .login(this.state.form)
      .then((result) => {
        this.props.getUserData(this.props.auth.data.user_id);
        localStorage.setItem("token", this.props.auth.data.token);
        localStorage.setItem("role", this.props.auth.data.user_role);
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({ ...this.state, isError: true });
      });
  };

  handleClick = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "reset":
        this.props.history.push("/reset-password");
        break;
      case "register":
        this.props.history.push("/sign-up");
        break;
      default:
        break;
    }
  };

  render() {
    const { isError } = this.state;
    const { msg } = this.props.auth;
    return (
      <Container fluid className={styles.container}>
        <Row className="vh-100">
          <Col
            xs={7}
            className={`d-flex flex-column justify-content-center align-items-center ${styles.leftBanner}`}
          >
            <img
              src={brandLogo}
              alt="uvies logo"
              className={`${styles.uviesLogo}`}
              onClick={() => this.props.history.push("/")}
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
                onClick={() => this.props.history.push("/")}
              />
              <h1 className={`${styles.signIn}`}>Sign In</h1>
              <p className={`${styles.signInMessage}`}>
                Sign in with your data that you entered during your registration
              </p>
              <Form className="position-relative" onSubmit={this.handleLogin}>
                <Alert
                  variant="danger"
                  className={`d-flex align-items-center ${styles.alert} ${
                    isError && styles.show
                  }`}
                >
                  <XCircleIcon style={{ height: "24px" }} className="me-2" />
                  {msg}
                </Alert>
                <Form.Group
                  controlId="email"
                  className={`${styles.inputEmailGroup}`}
                >
                  <Form.Label className={`${styles.formLabel}`}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Write your email"
                    name="userEmail"
                    className={`${styles.formInput}`}
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
                    required
                    type="password"
                    placeholder="Write your password"
                    name="userPassword"
                    className={`${styles.formInput}`}
                    onChange={(e) => this.changeText(e)}
                  />
                </Form.Group>
                {this.props.auth.isLoading ? (
                  <Button
                    variant="primary"
                    className={`w-100 ${styles.btnSignIn}`}
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    <span className="sr-only">Loading...</span>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    className={`w-100 ${styles.btnSignIn}`}
                  >
                    Sign In
                  </Button>
                )}
              </Form>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.forgotPassword}`}
              >
                <p className="m-0 me-2">Forgot password?</p>
                <a
                  href="/"
                  name="resetPassword"
                  className={`${styles.reset}`}
                  onClick={this.handleClick}
                >
                  Reset now
                </a>
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.register}`}
              >
                <p className="m-0 me-2">Don't have an account yet?</p>
                <a
                  href="/sign-up"
                  name="register"
                  className={`${styles.registerAccount}`}
                  onClick={this.handleClick}
                >
                  Register
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

const mapDispatchToProps = { login, getUserData };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
