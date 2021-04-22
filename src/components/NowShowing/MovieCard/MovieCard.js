import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import movieImage from "../../../assets/img/spiderman-home-coming.png";
import Styles from "./MovieCard.module.css";

export default class MovieCard extends Component {
  render() {
    const{movieName, movieCategory} = this.props
    return (
      <Card
        className={`d-flex align-items-center text-center ${Styles.movieCardContainer}`}
      >
        <Card.Img
          variant="top"
          src={movieImage}
          className={`${Styles.movieImg}`}
        />
        <Card.Body className={`${Styles.movieCardBody}`}>
          <Card.Title className={`${Styles.movieTitle}`}>
            {movieName}
          </Card.Title>
          <Card.Text className={`${Styles.movieGenre}`}>
            {movieCategory}
          </Card.Text>
          <Button variant="outline-primary">Details</Button>
          <Button variant="primary">Book Now</Button>
        </Card.Body>
      </Card>
    );
  }
}
