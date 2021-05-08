import React, { Component } from "react";
import { Link } from "react-router-dom";
import qs from "query-string";

import { connect } from "react-redux";
import {
  getUserData,
  updateUserData,
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
} from "react-bootstrap";
import styles from "./ProfilePage.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import BlankProfilePict from "../../../assets/img/blank-profile-picture.jpg";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        image: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        newPassword: "",
        confirmPassword: "",
      },
      isUpdateDataSuccess: false,
      isUpdatePasswordSuccess: false,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    this.props.getUserData(localStorage.getItem("userId")).then(() => {
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
    // console.log(e.target.files[0]);
    this.setState({
      form: {
        ...this.state.form,
        image: e.target.files[0],
      },
    });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const userId = qs.parse(this.props.location.search).userId;
    // console.log(e);
    if (e.target.name === "updateUserData") {
      const dataToUpdate = this.state.form;
      delete dataToUpdate.newPassword;
      delete dataToUpdate.confirmPassword;

      if (!dataToUpdate.image) {
        delete dataToUpdate.image;
        // console.log(dataToUpdate);
        this.props.updateUserData(userId, dataToUpdate).then(() => {
          this.setState({
            form: {
              ...this.state.form,
              image: null,
            },
            isUpdateDataSuccess: true,
          });
        });
      } else {
        const formData = new FormData();
        for (const field in dataToUpdate) {
          formData.append(field, dataToUpdate[field]);
        }

        // for (let pair of formData.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }

        this.props.updateUserData(userId, formData).then(() => {
          this.setState({
            form: {
              ...this.state.form,
              image: null,
            },
            isUpdateDataSuccess: true,
          });
        });
      }
    } else if (e.target.name === "updateUserPassword") {
      const { newPassword, confirmPassword } = this.state.form;

      const newPasswordData = {
        newPassword,
        confirmPassword,
      };

      this.props.updateUserPassword(userId, newPasswordData).then(() => {
        this.setState({
          isUpdatePasswordSuccess: true,
        });
      });
    }
  };

  render() {
    const { firstName, lastName, email, phoneNumber } = this.state.form;
    const { isUpdateDataSuccess, isUpdatePasswordSuccess } = this.state;
    const { isUpdateDataError, isUpdatePasswordError, msg } = this.props.user;
    const { user_name, user_profile_picture } = this.props.user.data;
    return (
      <>
        <Navbar />
        <Container fluid as={"main"} className={`${styles.mainWrapper}`}>
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
                    <img
                      src={
                        user_profile_picture
                          ? `${process.env.REACT_APP_API_USER_IMG_URL}/${user_profile_picture}`
                          : BlankProfilePict
                      }
                      className={`w-100 h-100 ${styles.userPicture}`}
                      alt="user pict"
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
            </Col>
            <Col lg={8}>
              <div
                className={`d-flex align-items-center ${styles.wrapper} ${styles.profileNavigation}`}
              >
                <div className={`d-flex h-100`}>
                  <Link
                    to="/profile-page"
                    className={`d-block d-flex align-items-center position-relative mr-5 text-decoration-none`}
                  >
                    Account Settings
                  </Link>
                  <Link
                    to="/profile-page"
                    className={`d-block d-flex align-items-center position-relative text-decoration-none`}
                  >
                    Order History
                  </Link>
                </div>
              </div>
              <form name="updateUserData" onSubmit={this.handleUpdate}>
                <div className={`mt-5 ${styles.wrapper}`}>
                  {(isUpdateDataSuccess && (
                    <Alert variant="success" className="mb-4">
                      Success update your detail information
                    </Alert>
                  )) ||
                    (isUpdateDataError && (
                      <Alert variant="danger" className="mb-4">
                        {msg}
                      </Alert>
                    ))}
                  <h6>Details Information</h6>
                  <hr className={`mb-5`} />
                  <Row xs={1} md={2}>
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="My first name"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => this.changeStateForm(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId="emailAddress">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="My email address"
                          name="email"
                          value={email}
                          onChange={(e) => this.changeStateForm(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.File
                          id="imageFile"
                          label="Upload profile picture"
                          name="image"
                          className={`${styles.imageUpload}`}
                          onChange={(e) => this.handleFile(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="My last name"
                          name="lastName"
                          value={lastName}
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
                    <Alert variant="success" className="mb-4">
                      {msg}
                    </Alert>
                  )) ||
                    (isUpdatePasswordError && (
                      <Alert variant="danger" className="mb-4">
                        {msg}
                      </Alert>
                    ))}
                  <h6>Change Password</h6>
                  <hr className={`mb-5`} />
                  <Row xs={1} sm={2}>
                    <Col>
                      <Form.Group controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="My new password"
                          name="newPassword"
                          // value={movieName}
                          onChange={(e) => this.changeStateForm(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm my new password"
                          name="confirmPassword"
                          // value={movieName}
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
  user: state.user,
});

const mapDispatchToProps = { getUserData, updateUserData, updateUserPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
