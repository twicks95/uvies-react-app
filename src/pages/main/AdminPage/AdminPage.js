import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar"
import Footer from "../../../components/Footer/Footer"
import { Col, Container, Row } from "react-bootstrap";
import Styles from "./AdminPage.module.css"

export default class AdminPage extends Component {
  render() {
    return(
    <main className={`${Styles.contentWrapper}`}>
      <Container fluid>
        <Row xs={1} lg={2}>
          <Col lg={7} className={`border p-0`}>
            <h3>Movie Description</h3>
            <div className={`${Styles.wrapper} border`}>
              Content
            </div>
          </Col>
          <Col lg={5} className={`border p-0`}>
            <div className={`border border-danger`}>
              <h3>Premiere Location</h3>
              <div className={`${Styles.wrapper} border border-warning`}>
              Content
            </div>
            </div>
            <div className={`border border-success`}>
              <h3>Showtimes</h3>
              <div className={`${Styles.wrapper} border`}>
              Content
            </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
    )
  }
}
