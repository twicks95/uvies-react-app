import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import Styles from "./AdminPage.module.css";

import ebvid from "../../../assets/img/ebu-id-logo.svg";
import cineOne21 from "../../../assets/img/cine-one-21-logo.svg";
import hiflix from "../../../assets/img/hiflix-logo.svg";

export default class AdminPage extends Component {
  render() {
    return (
      <>
        <Navbar />
        {/* <main className={`${Styles.mainWrapper}`}> */}
        <Container fluid as={`main`} className={`${Styles.mainWrapper}`}>
          <Row xs={1} lg={2}>
            <Col lg={7} className={`border p-0`}>
              <h3>Movie Description</h3>
              <div className={`${Styles.wrapper} border`}>Content</div>
            </Col>
            <Col lg={5} className={`border p-0`}>
              <div className={`border border-danger`}>
                <h3>Premiere Location</h3>
                <div className={`${Styles.wrapper} border border-warning`}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      className={`d-flex align-items-center justify-content-between`}
                    >
                      Purwokerto
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Container fluid>
                    <Row xs={3}>
                      <Col className={`border p-0`}>
                        <div style={{ border: 1 + "px" + " solid" + " green" }}>
                          <img
                            src={ebvid}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                      <Col className={`border p-0`}>
                        <div className={`border`}>
                          <img
                            src={cineOne21}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                      <Col className={`border p-0`}>
                        <div className={`border`}>
                          <img
                            src={hiflix}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                      <Col className={`border p-0`}>
                        <div className={`border`}>
                          <img
                            src={ebvid}
                            alt="ebv.id"
                            className={`${Styles.premiereLocationImageWidth}`}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
              <div className={`border border-success`}>
                <h3>Showtimes</h3>
                <div className={`${Styles.wrapper} border`}>Content</div>
              </div>
            </Col>
          </Row>
          <Row xs={1} as={`section`} className={`border`}>
            <h3>Sales Charts</h3>
            <div className={`${Styles.salesChartNav} ${Styles.wrapper}`}></div>
          </Row>
        </Container>

        {/* </main> */}
        <Footer />
      </>
    );
  }
}
