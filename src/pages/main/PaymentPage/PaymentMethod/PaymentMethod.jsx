import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "./PaymentMethod.module.css";

import googlePayLogo from "../../../../assets/img/gplay-logo.svg";
import visaLogo from "../../../../assets/img/visa-logo.svg";
import gopayLogo from "../../../../assets/img/gopay-logo.svg";
import paypalLogo from "../../../../assets/img/paypal-logo.svg";
import danaLogo from "../../../../assets/img/dana-logo.svg";
import bcaLogo from "../../../../assets/img/bca-logo.svg";
import briLogo from "../../../../assets/img/bri-logo.svg";
import ovoLogo from "../../../../assets/img/ovo-logo.svg";

export default function PaymentMethod(props) {
  return (
    <div className={styles.paymentMethodContainer}>
      <h4>Choose a Payment Method</h4>
      <Card className={styles.paymentMethod}>
        <Row xs={3} md={4} className={styles.aRow}>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="Google Pay"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img
                  id="Google Pay"
                  src={googlePayLogo}
                  alt="Google Play"
                ></img>
              </Button>
            </div>
          </Col>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="VISA"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img id="VISA" src={visaLogo} alt="Google Play"></img>
              </Button>
            </div>
          </Col>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="GoPay"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img id="GoPay" src={gopayLogo} alt="Google Play"></img>
              </Button>
            </div>
          </Col>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="Paypal"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img id="Paypal" src={paypalLogo} alt="Google Play"></img>
              </Button>
            </div>
          </Col>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="Dana"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img id="Dana" src={danaLogo} alt="Google Play"></img>
              </Button>
            </div>
          </Col>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="BCA"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img id="BCA" src={bcaLogo} alt="Google Play"></img>
              </Button>
            </div>
          </Col>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="BRI"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img id="BRI" src={briLogo} alt="Google Play"></img>
              </Button>
            </div>
          </Col>
          <Col className={styles.colPadding}>
            <div>
              <Button
                variant="outline-secondary"
                id="OVO"
                className={`d-flex align-items-center justify-content-center ${styles.payment}`}
                onClick={(e) => props.setPaymentMethod(e.target.id)}
              >
                <img id="OVO" src={ovoLogo} alt="Google Play"></img>
              </Button>
            </div>
          </Col>
        </Row>
        <span
          className={`d-flex justify-content-center align-items-center ${styles.orSeparator}`}
        >
          or
        </span>
        <p className="text-center">
          Pay via cash.
          <a className="text-decoration-none" href="/">
            {" "}
            See how it work
          </a>
        </p>
      </Card>
    </div>
  );
}
