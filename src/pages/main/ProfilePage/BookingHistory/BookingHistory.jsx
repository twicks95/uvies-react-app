import { ChevronDownIcon } from "@heroicons/react/solid";
import { Button, Col, Row } from "react-bootstrap";
import styles from "./BookingHistory.module.css";

import Ebv from "../../../../assets/img/ebu-id-logo.svg";
import CineOne from "../../../../assets/img/cine-one-21-logo.svg";
import Hiflix from "../../../../assets/img/hiflix-logo.svg";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import Loading from "../../../../assets/icons/Ellipsis-1.4s-70px.svg";
import { useState } from "react";

const BookingHistory = (props) => {
  const [showTicket, setShowTicket] = useState(false);

  const getDateWithTimeReset = (date) => new Date(date).setHours(0, 0, 0, 0);
  const getDateNow = () => new Date(Date.now());

  const isYesterday = (date) => {
    const dateShow = getDateWithTimeReset(date);
    return dateShow < getDateNow().setHours(0, 0, 0, 0);
  };

  const havePastTheCurrentTime = (date, hour) => {
    return (
      getDateNow().setHours(
        parseInt(hour.split(":")[0]),
        parseInt(hour.split(":")[1]),
        parseInt(hour.split(":")[2])
      ) < getDateNow() &&
      getDateWithTimeReset(date) === getDateNow().setHours(0, 0, 0, 0)
    );
  };

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
                    className={
                      item.premiere_name === "CineOne21"
                        ? styles.cineOne21
                        : null
                    }
                  />
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                {isYesterday(item.booking_for_date) ||
                havePastTheCurrentTime(
                  item.booking_for_date,
                  item.schedule_clock
                ) ? (
                  <Button className={styles.ticketUsed}>Ticket used</Button>
                ) : (
                  <Button
                    className={styles.ticketActive}
                    onMouseEnter={() => setShowTicket(true)}
                    onMouseLeave={() => setShowTicket(false)}
                    onClick={
                      showTicket
                        ? () =>
                            props.history.push(
                              `/user/booking/ticket?bookingId=${item.booking_id}`
                            )
                        : null
                    }
                  >
                    {showTicket ? "Show ticket" : "Ticket in active"}
                  </Button>
                )}
                <span className={styles.showDetails}>
                  Show details <ChevronDownIcon />
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
      {props.loading ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <img src={Loading} alt="loading" style={{ height: "1.4em" }} />
        </div>
      ) : props.limit < props.totalBooking ? (
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
