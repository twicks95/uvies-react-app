import { connect } from "react-redux";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import styles from "./AccountSettings.module.css";

const AccountSettings = (props) => {
  const { user_email, user_role, user_verification } = props.user.data;
  const {
    isUpdateDataError,
    isUpdatePasswordError,
    msg,
    updatingDetail,
    updatingPassword,
  } = props.user;

  return (
    <>
      <form name="updateUserData" onSubmit={props.handleUpdate}>
        <div className={`mt-5 ${styles.wrapper}`}>
          {(props.isUpdateDataSuccess && (
            <Alert variant="success" className="d-flex align-items-center mb-4">
              <CheckCircleIcon style={{ height: "20px", marginRight: "5px" }} />
              Success update your detail information
            </Alert>
          )) ||
            (isUpdateDataError && (
              <Alert
                variant="danger"
                className="d-flex align-items-center mb-4"
              >
                <XCircleIcon style={{ height: "20px", marginRight: "5px" }} />
                {msg}
              </Alert>
            ))}
          <h6>Details Information</h6>
          <hr className={`mb-5`} />
          <Row xs={1} md={2}>
            <Col>
              <Form.Group controlId="firstName" className={styles.formGroup}>
                <Form.Label>
                  First Name{" "}
                  <span
                    className={!props.firstName ? styles.show : styles.hide}
                  >
                    (Required field)
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="My first name"
                  name="firstName"
                  value={props.firstName}
                  className={!props.firstName ? styles.redBorder : ""}
                  onChange={(e) => props.changeStateForm(e)}
                />
              </Form.Group>
              <Form.Group controlId="emailAddress" className={styles.formGroup}>
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
                      (Not verified)
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#2f702f",
                        fontSize: "12px",
                        fontWeight: "600",
                        marginLeft: "5px",
                      }}
                    >
                      (Verified)
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
              <Form.Group controlId="lastName" className={styles.formGroup}>
                <Form.Label>
                  Last Name{" "}
                  <span className={!props.lastName ? styles.show : styles.hide}>
                    (Required field)
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="My last name"
                  name="lastName"
                  value={props.lastName}
                  className={!props.lastName ? styles.redBorder : ""}
                  onChange={(e) => props.changeStateForm(e)}
                />
              </Form.Group>
              {user_role === "user" ? (
                <Form.Group
                  controlId="phoneNumber"
                  className={styles.formGroup}
                >
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
                      value={props.phoneNumber}
                      className={`${styles.phoneInput}`}
                      onChange={(e) => props.changeStateForm(e)}
                    />
                  </InputGroup>
                </Form.Group>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </div>
        {updatingDetail ? (
          <Button
            variant="primary"
            className={`mt-3 ${styles.updateChangesButton}`}
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
            <span className="sr-only">Updating...</span>
          </Button>
        ) : (
          <Button
            type="submit"
            className={`mt-3 ${styles.updateChangesButton}`}
          >
            Update my detail information
          </Button>
        )}
      </form>
      <form name="updateUserPassword" onSubmit={props.handleUpdate}>
        <div className={`mt-5 ${styles.wrapper}`}>
          {(props.isUpdatePasswordSuccess && (
            <Alert variant="success" className="d-flex align-items-center mb-4">
              <CheckCircleIcon style={{ height: "20px", marginRight: "5px" }} />
              {msg}
            </Alert>
          )) ||
            (isUpdatePasswordError && (
              <Alert
                variant="danger"
                className="d-flex align-items-center mb-4"
              >
                <XCircleIcon style={{ height: "20px", marginRight: "5px" }} />
                {msg}
              </Alert>
            ))}
          <h6>Change Password</h6>
          <hr className={`mb-5`} />
          <Row xs={1} sm={2}>
            <Col>
              <Form.Group controlId="newPassword" className={styles.formGroup}>
                <Form.Label>
                  New Password{" "}
                  <span
                    className={!props.newPassword ? styles.show : styles.hide}
                  >
                    (Required field)
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="My new password"
                  name="newPassword"
                  value={props.newPassword}
                  className={!props.newPassword ? styles.redBorder : ""}
                  onChange={(e) => props.changeStateForm(e)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                controlId="confirmPassword"
                className={styles.formGroup}
              >
                <Form.Label>
                  Confirm Password{" "}
                  <span
                    className={
                      !props.confirmPassword ? styles.show : styles.hide
                    }
                  >
                    (Required field)
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm my new password"
                  name="confirmPassword"
                  value={props.confirmPassword}
                  className={!props.confirmPassword ? styles.redBorder : ""}
                  onChange={(e) => props.changeStateForm(e)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
        {updatingPassword ? (
          <Button
            variant="primary"
            className={`mt-3 ${styles.updateChangesButton}`}
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
            <span className="sr-only">Changing password...</span>
          </Button>
        ) : (
          <Button
            type="submit"
            className={`mt-3 ${styles.updateChangesButton}`}
          >
            Change my password
          </Button>
        )}
      </form>{" "}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, null)(AccountSettings);
