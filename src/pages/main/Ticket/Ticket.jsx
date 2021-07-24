/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import styles from "./Ticket.module.css";
import qs from "query-string";
import { PrinterIcon } from "@heroicons/react/outline";
import { DownloadIcon } from "@heroicons/react/solid";
import { Button, Col, Row } from "react-bootstrap";
import Tickitz from "../../../assets/img/tickitz.png";
import QRCode from "../../../assets/img/QRCode.png";
import { useEffect, useState } from "react";
import axiosApiInstances from "../../../utils/axios";
import moment from "moment";

export default function Ticket(props) {
  const { bookingId } = qs.parse(props.location.search);
  const [data, setData] = useState({});
  const [seat, setSeat] = useState([]);

  (function () {
    !bookingId && props.history.push("/");
  })();

  useEffect(() => {
    axiosApiInstances.get(`booking/by/bookingId/${bookingId}`).then((res) => {
      setData(res.data.data[0]);
    });

    axiosApiInstances.get(`booking/seat/${bookingId}`).then((res) => {
      let seat = [];
      for (const i of res.data.data) {
        seat.push(i.booking_seat_location);
      }
      setSeat(seat);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <section>
          <h1>Proof of Payment</h1>
          <Row className={`g-0 ${styles.ticket}`}>
            <Col md={8}>
              <div>
                <div
                  className={`d-flex align-items-center justify-content-between px-5 ${styles.head1}`}
                >
                  <img src={Tickitz} alt="tickitz" />
                  <span>Admit One</span>
                </div>
                <div className={`p-5 ${styles.body1}`}>
                  <h6>Movie</h6>
                  <span>{data.movie_name}</span>
                  <Row className="mt-4">
                    <Col>
                      <div className="mb-4">
                        <div className="mb-4">
                          <h6>Date</h6>
                          <span>
                            {moment(data.booking_for_date).format("DD MMM")}
                          </span>
                        </div>
                        <div>
                          <h6>Count</h6>
                          <span>{data.booking_ticket} pieces</span>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-4">
                        <div className="mb-4">
                          <h6>Time</h6>
                          <span>
                            {moment(`2021-12-12 ${data.schedule_clock}`).format(
                              "LT"
                            )}
                          </span>
                        </div>
                        <div>
                          <h6>Seats</h6>
                          <span
                            style={{ display: "inline-block", width: "80%" }}
                          >
                            {seat.map((item, index) =>
                              index > 0 ? `, ${item}` : item
                            )}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-4">
                        <div className="mb-4">
                          <h6>Category</h6>
                          <span>PG-13</span>
                        </div>
                        <div>
                          <h6>Price</h6>
                          <span
                            style={{ fontSize: "2.4em", fontWeight: "700" }}
                          >
                            IDR
                            {data.booking_total_price
                              ? data.booking_total_price.toLocaleString("id-ID")
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={4} className="h-100">
              <div
                className={`d-flex align-items-center justify-content-center ${styles.head2}`}
              >
                <img src={Tickitz} alt="tickitz" />
              </div>
              <div className={styles.body2}>
                <img src={QRCode} alt="QR Code" className={styles.qrCode} />
              </div>
            </Col>
          </Row>
          <div
            className={`d-flex flex-column flex-sm-row gap-2 mt-5 ${styles.btnGroup}`}
          >
            <Button
              variant="secondary"
              className="d-flex align-items-center justify-content-center"
            >
              <DownloadIcon /> Download
            </Button>
            <Button
              variant="secondary"
              className="d-flex align-items-center justify-content-center"
            >
              <PrinterIcon />
              Print
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
