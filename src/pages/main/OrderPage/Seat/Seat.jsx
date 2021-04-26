import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./Seat.module.css";

export default class Seat extends Component {
  constructor() {
    super();
    this.state = {
      seatA: [1, 2, 3, 4, 5, 6, 7],
      seatB: [8, 9, 10, 11, 12, 13, 14],
    };
  }

  componentDidMount() {
    this.setAlphabetSeat();
    console.log(this.state);
  }

  setAlphabetSeat = () => {
    const { seatAlphabet } = this.props;
    const seatA = this.state.seatA.map((item) => `${seatAlphabet}${item}`);
    const seatB = this.state.seatB.map((item) => `${seatAlphabet}${item}`);
    this.setState({
      seatA: seatA,
      seatB: seatB,
    });
  };

  render() {
    const { seatA, seatB } = this.state;
    const {
      seatAlphabet,
      selectedSeat,
      reservedSeat,
      bookingSeat,
    } = this.props;
    return (
      <>
        <Row className={`flex-nowrap align-items-center ${styles.seatRow}`}>
          <Col>{seatAlphabet}</Col>
          {seatA.map((item, index) => {
            return (
              <Col className={`p-0`} key={index}>
                <div
                  onClick={() => bookingSeat(item)}
                  className={`${styles.seat} ${
                    reservedSeat.indexOf(item) > -1
                      ? styles.soldSeat
                      : selectedSeat.indexOf(item) > -1
                      ? styles.selectedSeat
                      : styles.seatAvailable
                  }`}
                ></div>
              </Col>
            );
          })}
          <Col className={`p-0`}></Col>
          {seatB.map((item, index) => {
            return (
              <Col className={`p-0`}>
                <div className={`${styles.seat} ${styles.seatAvailable}`}></div>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}
