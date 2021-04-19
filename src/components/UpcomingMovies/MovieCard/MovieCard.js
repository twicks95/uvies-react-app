import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import movieImage from "../../../assets/img/black-widow.png";
import Styles from "./MovieCard.module.css";

export default class MovieCard extends Component {
  render() {
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
            Black Widow
          </Card.Title>
          <Card.Text className={`${Styles.movieGenre}`}>
            Action, Adventure, Sci-Fi
          </Card.Text>
          <Button variant="outline-primary">Details</Button>
        </Card.Body>
      </Card>
    );
  }
}