import React, { Component } from "react";
import Styles from "./Footer.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import EbvId from "../../assets/img/ebu-id-logo.svg"
import CineOne21 from "../../assets/img/cine-one-21-logo.svg"
import Hiflix from "../../assets/img/hiflix-logo.svg"

import BrandLogo from "../../assets/icons/Tickitz.svg"
import Facebook from "../../assets/icons/bx_bxl-facebook-circle.svg"
import Instagram from "../../assets/icons/bx_bxl-instagram.svg"
import Twitter from "../../assets/icons/twitter-icon.svg"
import Youtube from "../../assets/icons/youtube-icon.svg"

export default class Footer extends Component {
  render() {
    return (
      <footer className={Styles.footer}>
        <Container fluid className={`p-0`}>
          <Row xs={1} lg={4} className={`m-0`}>
            <Col xs={12} lg={4} className={`p-0 ${Styles.footerLeft}`}>
              <img src={BrandLogo} alt="uvies-logo" />
              <p>
                Stop waiting in line. Buy tickets conveniently, watch movies
                quietly.
              </p>
            </Col>
            <Col
              xs={12}
              lg={2}
              className={`d-flex flex-column p-0 ${Styles.explore}`}
            >
              <h5>Explore</h5>
              <div
                className={`d-flex flex-wrap flex-row flex-md-column ${Styles.exploreLink}`}
              >
                <Link to="/cinemas" className="text-decoration-none">
                  Cinemas
                </Link>
                <Link to="/movie-list" className="text-decoration-none">
                  Movies List
                </Link>
                <Link to="/my-ticket" className="text-decoration-none">
                  My Ticket
                </Link>
                <Link to="/notification" className="text-decoration-none">
                  Notification
                </Link>
              </div>
            </Col>
            <Col xs={12} lg={3} className={`p-0 ${Styles.sponsor}`}>
              <h5>Our Sponsor</h5>
              <div className={`d-flex flex-wrap flex-row flex-md-column`}>
                <div className={Styles.sponsorLogoContainer}>
                  <img
                    src={EbvId}
                    alt="ebv.id"
                    className={Styles.sponsorEbu}
                  />
                </div>
                <div
                  className={`d-flex align-items-end ${Styles.sponsorLogoContainer}`}
                >
                  <img
                    src={CineOne21}
                    alt="CineOne21"
                    className={Styles.sponsorCineOne}
                  />
                </div>
                <div
                  className={`d-flex align-items-end ${Styles.sponsorLogoContainer}`}
                >
                  <img
                    src={Hiflix}
                    alt="hiflix"
                    className={Styles.sponsorHiflix}
                  />
                </div>
              </div>
            </Col>
            <Col className={`p-0 ${Styles.followUs}`}>
              <h5>Follow Us</h5>
              <div className={`d-flex ${Styles.footerRight}`}>
                <div
                  className={`d-flex flex-row flex-lg-column align-items-center ${Styles.socialIcons}`}
                >
                  <img
                    src={Facebook}
                    alt="facebook"
                  />
                  <img
                    src={Instagram}
                    alt="Instagram"
                  />
                  <img src={Twitter} alt="Twitter" />
                  <img src={Youtube} alt="Youtube" />
                </div>
                <div
                  className={`d-flex flex-lg-column ${Styles.socialUsernames}`}
                >
                  <p>Uvies Cinema id</p>
                  <p>uvies.id</p>
                  <p>uvies.id</p>
                  <p>Uvies Cinema id</p>
                </div>
              </div>
            </Col>
          </Row>
          <small
            className={`d-flex justify-content-lg-center ${Styles.copyright}`}
          >
            © 2020 Tickitz. All Rights Reserved.
          </small>
        </Container>
      </footer>
    );
  }
}
