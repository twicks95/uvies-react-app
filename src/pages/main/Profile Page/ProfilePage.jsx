import React, { Component } from "react";
import { Link } from "react-router-dom";
import qs from "query-string";
import moment from "moment";
import { connect } from "react-redux";
import {
  getUserData,
  updateUserData,
  updateUserImage,
  updateUserPassword,
} from "../../../redux/actions/user";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Toast,
} from "react-bootstrap";
import styles from "./ProfilePage.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { PencilAltIcon, UserCircleIcon } from "@heroicons/react/outline";
import {
  CheckCircleIcon,
  LogoutIcon,
  UploadIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        newPassword: "",
        confirmPassword: "",
      },
      menu: { settings: true, history: false },
      image: null,
      showToast: false,
      uploading: false,
      isUpdateDataSuccess: false,
      isUpdatePasswordSuccess: false,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    this.props.getUserData(this.props.auth.data.user_id).then(() => {
      const userName = this.props.user.data.user_name;
      const splittedName = userName.split(" ");

      this.setState({
        form: {
          ...this.state.form,
          firstName: splittedName[0],
          lastName: splittedName[splittedName.length - 1],
          email: this.props.user.data.user_email,
          phoneNumber: this.props.user.data.user_phone_number,
        },
      });
    });
  };

  changeStateForm = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleFile = (e) => {
    this.setState({
      ...this.state,
      image: e.target.files[0],
    });
  };

  handleUpload = () => {
    this.setState({ ...this.state, uploading: true });
    const userId = qs.parse(this.props.location.search).userId;
    const { image } = this.state;
    const data = { image };

    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }
    this.props
      .updateUserImage(userId, formData)
      .then(() => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            image: null,
            showToast: true,
            uploading: false,
          });
        }, 1000);
      })
      .catch(() => {
        this.setState({
          ...this.state,
          image: null,
          showToast: true,
          uploading: false,
        });
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const userId = qs.parse(this.props.location.search).userId;

    if (e.target.name === "updateUserData") {
      const { firstName, lastName } = this.state.form;

      if (firstName && lastName) {
        const data = this.state.form;
        delete data.newPassword;
        delete data.confirmPassword;

        this.props.updateUserData(userId, data).then(() => {
          this.setState({
            ...this.state,
            isUpdateDataSuccess: true,
          });
        });
      }
    } else if (e.target.name === "updateUserPassword") {
      const { newPassword, confirmPassword } = this.state.form;

      if (newPassword && confirmPassword) {
        const data = {
          newPassword,
          confirmPassword,
        };

        this.props.updateUserPassword(userId, data).then(() => {
          this.setState({
            form: {
              ...this.state.form,
              newPassword: "",
              confirmPassword: "",
            },
            isUpdatePasswordSuccess: true,
          });
        });
      }
    }
  };

  handleSignOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const { settings, history } = this.state.menu;
    const { firstName, lastName, phoneNumber, newPassword, confirmPassword } =
      this.state.form;
    const { user_email, user_name, user_profile_picture, user_verification } =
      this.props.user.data;
    const {
      image,
      isUpdateDataSuccess,
      isUpdatePasswordSuccess,
      showToast,
      uploading,
    } = this.state;
    const {
      isUpdateDataError,
      isUpdatePasswordError,
      isUpdateImageError,
      updatedAt,
      msg,
    } = this.props.user;
    return (
      <>
        <Navbar />
        <Container fluid as={"main"} className={`${styles.mainWrapper}`}>
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 0,
              zIndex: 1,
            }}
          >
            <Toast
              onClose={() => this.setState({ ...this.state, showToast: false })}
              show={showToast}
              delay={10000}
              autohide
              className={styles.toastSuccess}
              style={{ backgroundColor: "white", width: "400px" }}
            >
              <Toast.Header>
                {isUpdateImageError ? (
                  <XCircleIcon style={{ color: "#ea2e2e" }} />
                ) : (
                  <CheckCircleIcon style={{ color: "#5f2eea" }} />
                )}
                <strong className="mr-auto">Upload Image</strong>
                <small>{moment(updatedAt).fromNow()}</small>
              </Toast.Header>
              <Toast.Body>{msg}</Toast.Body>
            </Toast>
          </div>
          <Row xs={1} lg={2}>
            <Col lg={4}>
              <div className={`d-flex flex-column ${styles.wrapperInfo}`}>
                <div className={`d-flex flex-column align-items-center`}>
                  <div
                    className={`d-flex justify-content-between align-items-center w-100`}
                  >
                    <h6 className={`m-0`}>INFO</h6>
                    <div className={`d-flex ${styles.meatballsMenu}`}>
                      <div className={`${styles.ball}`}></div>
                      <div className={`${styles.ball}`}></div>
                      <div className={`${styles.ball}`}></div>
                    </div>
                  </div>
                  <div className={`${styles.userProfilePictureWrapper}`}>
                    {user_profile_picture ? (
                      <img
                        src={`${process.env.REACT_APP_API_USER_IMG_URL}/${user_profile_picture}`}
                        className={`w-100 h-100 ${styles.userPicture}`}
                        alt="user pict"
                      />
                    ) : (
                      <UserCircleIcon />
                    )}
                    {image ? (
                      <Button
                        title="upload"
                        className={styles.upload}
                        onClick={this.handleUpload}
                      >
                        {uploading ? (
                          <Spinner
                            animation="grow"
                            style={{ height: "10px", width: "10px" }}
                          />
                        ) : (
                          <UploadIcon />
                        )}
                      </Button>
                    ) : (
                      <label for="upload" className={styles.edit}>
                        <PencilAltIcon />
                      </label>
                    )}
                    <input
                      type="file"
                      id="upload"
                      title="choose image"
                      onChange={(e) => this.handleFile(e)}
                    />
                  </div>
                  <h4>{user_name}</h4>
                  <p className={`${styles.userTitle}`}>Moviegoers</p>
                </div>
                <hr className="w-100" />
                <div>
                  <h6>Loyalti Points</h6>
                </div>
              </div>
              <Button
                variant="light"
                className={`mt-3 mb-5 mb-lg-0 w-100 ${styles.signOutButton}`}
                onClick={this.handleSignOut}
              >
                <LogoutIcon />
                Sign Out
              </Button>
            </Col>
            <Col lg={8}>
              <div
                className={`d-flex align-items-center ${styles.wrapper} ${styles.profileNavigation}`}
              >
                {/* <div className={`d-flex h-100`}> */}
                <Link
                  to="/profile?menu=settings"
                  name="settings"
                  className={`d-block d-flex align-items-center position-relative mr-5 text-decoration-none`}
                  onClick={(e) => {
                    this.setState({
                      ...this.state,
                      menu: {
                        ...this.state.menu,
                        [e.target.name]: true,
                        history: false,
                      },
                    });
                  }}
                >
                  Account Settings
                  <div
                    className={
                      settings ? styles.activeBorder : styles.menuBorder
                    }
                  />
                </Link>
                <Link
                  to="/profile?menu=history"
                  name="history"
                  className={`d-block d-flex align-items-center position-relative text-decoration-none`}
                  onClick={(e) => {
                    this.setState({
                      ...this.state,
                      menu: {
                        ...this.state.menu,
                        settings: false,
                        [e.target.name]: true,
                      },
                    });
                  }}
                >
                  Order History
                  <div
                    className={
                      history ? styles.activeBorder : styles.menuBorder
                    }
                  />
                </Link>
                {/* </div> */}
              </div>
              <form name="updateUserData" onSubmit={this.handleUpdate}>
                <div className={`mt-5 ${styles.wrapper}`}>
                  {(isUpdateDataSuccess && (
                    <Alert
                      variant="success"
                      className="d-flex align-items-center mb-4"
                    >
                      <CheckCircleIcon
                        style={{ height: "20px", marginRight: "5px" }}
                      />
                      Success update your detail information
                    </Alert>
                  )) ||
                    (isUpdateDataError && (
                      <Alert
                        variant="danger"
                        className="d-flex align-items-center mb-4"
                      >
                        <XCircleIcon
                          style={{ height: "20px", marginRight: "5px" }}
                        />
                        {msg}
                      </Alert>
                    ))}
                  <h6>Details Information</h6>
                  <hr className={`mb-5`} />
                  <Row xs={1} md={2}>
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Label>
                          First Name{" "}
                          <span
                            className={!firstName ? styles.show : styles.hide}
                          >
                            (Required field)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="My first name"
                          name="firstName"
                          value={firstName}
                          className={!firstName ? styles.redBorder : ""}
                          onChange={(e) => this.changeStateForm(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId="emailAddress">
                        <Form.Label>
                          E-mail{" "}
                          {user_verification === "0" ? (
                            <span
                              style={{
                                color: "#ea2e2e",
                                fontSize: "12px",
                                fontWeight: "600",
                                marginLeft: "5px",
                              }}
                            >
                              (Email is not verified)
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "#33d433",
                                fontSize: "12px",
                                fontWeight: "600",
                                marginLeft: "5px",
                              }}
                            >
                              (Email verified)
                            </span>
                          )}
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="My email address"
                          name="email"
                          value={user_email}
                          className={
                            user_verification === "1"
                              ? styles.verified
                              : styles.unverified
                          }
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="lastName">
                        <Form.Label>
                          Last Name{" "}
                          <span
                            className={!lastName ? styles.show : styles.hide}
                          >
                            (Required field)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="My last name"
                          name="lastName"
                          value={lastName}
                          className={!lastName ? styles.redBorder : ""}
                          onChange={(e) => this.changeStateForm(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Text
                              id="basic-addon1"
                              className={`${styles.phoneCodeRegion}`}
                            >
                              +62
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            placeholder="82323xxxxxx"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="phoneNumber"
                            value={phoneNumber}
                            className={`${styles.phoneInput}`}
                            onChange={(e) => this.changeStateForm(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <Button
                  type="submit"
                  className={`mt-3 ${styles.updateChangesButton}`}
                >
                  Update my detail information
                </Button>
              </form>
              <form name="updateUserPassword" onSubmit={this.handleUpdate}>
                <div className={`mt-5 ${styles.wrapper}`}>
                  {(isUpdatePasswordSuccess && (
                    <Alert
                      variant="success"
                      className="d-flex align-items-center mb-4"
                    >
                      <CheckCircleIcon
                        style={{ height: "20px", marginRight: "5px" }}
                      />
                      {msg}
                    </Alert>
                  )) ||
                    (isUpdatePasswordError && (
                      <Alert
                        variant="danger"
                        className="d-flex align-items-center mb-4"
                      >
                        <XCircleIcon
                          style={{ height: "20px", marginRight: "5px" }}
                        />
                        {msg}
                      </Alert>
                    ))}
                  <h6>Change Password</h6>
                  <hr className={`mb-5`} />
                  <Row xs={1} sm={2}>
                    <Col>
                      <Form.Group controlId="newPassword">
                        <Form.Label>
                          New Password{" "}
                          <span
                            className={!newPassword ? styles.show : styles.hide}
                          >
                            (Required field)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="My new password"
                          name="newPassword"
                          value={newPassword}
                          className={!newPassword ? styles.redBorder : ""}
                          onChange={(e) => this.changeStateForm(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>
                          Confirm Password{" "}
                          <span
                            className={
                              !confirmPassword ? styles.show : styles.hide
                            }
                          >
                            (Required field)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm my new password"
                          name="confirmPassword"
                          value={confirmPassword}
                          className={!confirmPassword ? styles.redBorder : ""}
                          onChange={(e) => this.changeStateForm(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <Button
                  type="submit"
                  className={`mt-3 ${styles.updateChangesButton}`}
                >
                  Change my password
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  getUserData,
  updateUserData,
  updateUserImage,
  updateUserPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);