import { ChevronDownIcon } from "@heroicons/react/solid";
import { Button, Col, Row } from "react-bootstrap";
import styles from "./BookingHistory.module.css";

import Ebv from "../../../../assets/img/ebu-id-logo.svg";
import CineOne from "../../../../assets/img/cine-one-21-logo.svg";
import Hiflix from "../../../../assets/img/hiflix-logo.svg";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";

const BookingHistory = (props) => {
  return (
    <div className={`mt-5 ${styles.wrapper}`}>
      <Row xs={1}>
        {props.bookingHistory.length > 0 ? (
          props.bookingHistory.map((item, index) => (
            <Col className={styles.historyCard} key={index}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className={styles.timeStamp}>
                    {moment(item.booking_for_date).format("dddd, DD MMMM YYYY")}
                    - {moment(`2021-12-12 ${item.schedule_clock}`).format("LT")}
                  </span>
                  <h5>{item.movie_name}</h5>
                </div>
                <div>
                  <img
                    src={
                      item.premiere_name === "Ebv.id"
                        ? Ebv
                        : item.premiere_name === "Hiflix"
                        ? Hiflix
                        : CineOne
                    }
                    alt="premiere"
                    style={
                      item.premiere_name === "CineOne21"
                        ? { width: "100px" }
                        : { height: "30px" }
                    }
                  />
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  onClick={() =>
                    props.history.push(
                      `/user/booking/ticket?bookingId=${item.booking_id}`
                    )
                  }
                >
                  Show ticket
                </Button>
                <span className={styles.showDetails}>
                  Show details <ChevronDownIcon style={{ height: "10px" }} />
                </span>
              </div>
            </Col>
          ))
        ) : (
          <Col className="d-flex align-items-center justify-content-center">
            <p style={{ fontWeight: "700" }}>No Booking History</p>
          </Col>
        )}
      </Row>
      {props.limit < props.totalBooking ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Link className={styles.viewMore} onClick={props.handleViewMore}>
            View More
          </Link>
        </div>
      ) : props.limit >= props.totalBooking && props.totalBooking > 2 ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Link className={styles.viewLess} onClick={props.handleViewLess}>
            View Less
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default withRouter(BookingHistory);
