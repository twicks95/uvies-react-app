import React, { Component } from "react";
import styles from "./ProfilePage.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

import { connect } from "react-redux";
import { getUserData } from "../../../redux/actions/user";

import userAvatar from "../../../assets/img/user-profile-pict.png";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userId: localStorage.getItem("userId"),
        firstName: this.props.user.data.user_name,
        lastName: this.props.user.data.user_name,
        email: this.props.user.data.user_email,
        phoneNumber: this.props.user.data.user_phone_number,
        image: null,
      },
    };
  }

  componentDidMount() {
    this.props.getUserData(this.state.data.userId);
  }

  changeStateData = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { firstName, lastName } = this.state.data;
    return (
      <>
        <Navbar />
        <Container fluid as={"main"} className={`${styles.mainWrapper}`}>
          <Row xs={1} lg={2}>
            <Col lg={4}>
              <div className={`d-flex flex-column ${styles.wrapper}`}>
                <div className={`d-flex flex-column align-items-center`}>
                  <div
                    className={`d-flex justify-content-between align-items-center w-100`}
                  >
                    <h6 className={`m-0`}>Info</h6>
                    <div>button</div>
                  </div>
                  <div className={`${styles.userProfilePictureWrapper}`}>
                    <img
                      src={userAvatar}
                      className={`w-100 h-100 ${styles.userPicture}`}
                      alt="user pict"
                    />
                  </div>
                  <h4>Jonas El Rodriguez</h4>
                  <p className={`${styles.userTitle}`}>Moviegoers</p>
                </div>
                <hr />
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
                    className={`d-block d-flex align-items-center position-relative mr-5`}
                  >
                    Account Settings
                  </Link>
                  <Link
                    className={`d-block d-flex align-items-center position-relative`}
                  >
                    Order History
                  </Link>
                </div>
              </div>
              <form>
                <div className={`mt-5 ${styles.wrapper}`}>
                  <h6>Details Information</h6>
                  <hr className={`mb-5`} />
                  <Row lg={2}>
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="My first name"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => this.changeStateData(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId="emailAddress">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="My email address"
                          name="email"
                          // value={movieName}
                          onChange={(e) => this.changeStateData(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.File
                          id="imageFile"
                          label="Upload profile picture"
                          className={`${styles.imageUpload}`}
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
                          onChange={(e) => this.changeStateData(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId="phoneNumber">
                        {/* <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="8232412xxxx"
                          name="phoneNumber"
                          // value={movieName}
                          // onChange={(e) => this.changeStateData(e)}
                        /> */}
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
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className={`${styles.phoneInput}`}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <Button className={`mt-3 ${styles.updateChangesButton}`}>
                  Update my detail information
                </Button>
              </form>
              <form>
                <div className={`mt-5 ${styles.wrapper}`}>
                  <h6>Change Password</h6>
                  <hr className={`mb-5`} />
                  <Row lg={2}>
                    <Col>
                      <Form.Group controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Write my new password"
                          name="newPassword"
                          // value={movieName}
                          // onChange={(e) => this.changeStateData(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm my password"
                          name="confirmPassword"
                          // value={movieName}
                          // onChange={(e) => this.changeStateData(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <Button className={`mt-3 ${styles.updateChangesButton}`}>
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

const mapDispatchToProps = { getUserData };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
