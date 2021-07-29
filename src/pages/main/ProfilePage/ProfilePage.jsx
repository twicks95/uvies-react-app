import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUserData,
  updateUserData,
  updateUserImage,
  updateUserPassword,
} from "../../../redux/actions/user";
import { Button, Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import styles from "./ProfilePage.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { PencilAltIcon } from "@heroicons/react/outline";
import {
  CheckCircleIcon,
  LogoutIcon,
  UploadIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import BookingHistory from "./BookingHistory/BookingHistory";
import AccountSettings from "./AccountSettings/AccountSettings";
import axiosApiInstances from "../../../utils/axios";

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
      bookingHistory: [],
      totalBooking: "",
      limit: "2",
    };
  }

  componentDidMount() {
    this.getUserData();
    axiosApiInstances
      .get(
        `booking/by/userId?userId=${this.props.auth.data.user_id}&limit=${this.state.limit}`
      )
      .then((res) => {
        this.setState({
          ...this.state,
          bookingHistory: res.data.data,
          totalBooking: res.data.pagination.totalData,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.limit !== prevState.limit) {
      this.props.history.push(
        `/profile?menu=history&limit=${this.state.limit}`
      );
      axiosApiInstances
        .get(
          `booking/by/userId?userId=${this.props.auth.data.user_id}&limit=${this.state.limit}`
        )
        .then((res) => {
          this.setState({ ...this.state, bookingHistory: res.data.data });
        });
    }
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
    const userId = this.props.auth.data.user_id;
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
    const userId = this.props.auth.data.user_id;

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

  handleViewMore = () => {
    this.setState({
      ...this.state,
      limit: parseInt(this.state.limit) + 2,
    });
  };

  handleViewLess = () => {
    this.setState({
      ...this.state,
      limit: "2",
    });
  };

  render() {
    const { settings, history } = this.state.menu;
    const { firstName, lastName, phoneNumber, newPassword, confirmPassword } =
      this.state.form;
    const { user_name, user_profile_picture, user_role } = this.props.user.data;
    const {
      image,
      isUpdateDataSuccess,
      isUpdatePasswordSuccess,
      showToast,
      uploading,
      bookingHistory,
      limit,
      totalBooking,
    } = this.state;
    const { isUpdateImageError, updatedAt, msg } = this.props.user;
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
              delay={7000}
              autohide
              className={styles.toastSuccess}
              style={{
                backgroundColor: "white",
              }}
            >
              <Toast.Header closeButton={false}>
                {isUpdateImageError ? (
                  <XCircleIcon style={{ color: "#ea2e2e" }} />
                ) : (
                  <CheckCircleIcon style={{ color: "#5f2eea" }} />
                )}
                <strong className="me-auto">Upload Image</strong>
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
                      <UserCircleIcon className={styles.imagePlaceholder} />
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
                      <label htmlFor="upload" className={styles.edit}>
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
                className={`d-flex align-items-center gap-5 justify-content-center justify-content-md-start ${styles.wrapper} ${styles.profileNavigation}`}
              >
                <Link
                  to="/profile?menu=settings"
                  name="settings"
                  className={`d-block d-flex align-items-center position-relative text-decoration-none`}
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
                {user_role === "user" ? (
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
                ) : (
                  <></>
                )}
              </div>
              {this.state.menu.settings ? (
                <AccountSettings
                  isUpdateDataSuccess={isUpdateDataSuccess}
                  isUpdatePasswordSuccess={isUpdatePasswordSuccess}
                  msg={msg}
                  firstName={firstName}
                  lastName={lastName}
                  phoneNumber={phoneNumber}
                  newPassword={newPassword}
                  confirmPassword={confirmPassword}
                  handleUpdate={this.handleUpdate}
                  changeStateForm={this.changeStateForm}
                />
              ) : (
                <BookingHistory
                  bookingHistory={bookingHistory}
                  limit={limit}
                  totalBooking={totalBooking}
                  handleViewMore={this.handleViewMore}
                  handleViewLess={this.handleViewLess}
                />
              )}
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
