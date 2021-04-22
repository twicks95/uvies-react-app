import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import movieImage from "../../../assets/img/black-widow.png";
import Styles from "./MovieCard.module.css";

export default class MovieCard extends Component {
  render() {
    const { movieName, movieCategory, movieId } = this.props;
    console.log(movieId);
    return (
      <Card
        className={`d-flex align-items-center text-center ${Styles.movieCardContainer}`}
      >
        <Card.Img
          variant="top"
          src={movieImage}
          className={`${Styles.movieImg}`}
        />
        <Card.Body
          className={`d-flex flex-column justify-content-between ${Styles.movieCardBody}`}
        >
          <Card.Title className={`${Styles.movieTitle}`}>
            {movieName}
          </Card.Title>
          <Card.Text className={`${Styles.movieGenre}`}>
            {movieCategory}
          </Card.Text>
          <Button
            variant="outline-primary"
            onClick={(event) => this.props.handleParams(movieId, event)}
          >
            Details
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
