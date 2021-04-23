import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./MovieCard.module.css";
import "./MovieCard.module.css";

import movieImage from "../../assets/img/john-wick-3.png";

const MovieCard = (props) => {
  const {
    isNowShowing,
    isAdminMovieData,
    movieName,
    movieCategory,
    movieId,
  } = props;

  const renderMovieCardButton = () => {
    if (isNowShowing) {
      return (
        <>
          <Button
            variant="outline-primary"
            onClick={(event) => props.handleParams(movieId, event)}
          >
            Details
          </Button>
          <Button
            variant="primary"
            onClick={(event) => props.handleParams(movieId, event)}
          >
            Book Now
          </Button>
        </>
      );
    } else if (isAdminMovieData) {
      return (
        <>
          <Button
            variant="outline-secondary"
            onClick={(event) => props.handleParams(movieId, event)}
          >
            Update
          </Button>
          <Button
            variant="danger"
            onClick={(event) => props.handleParams(movieId, event)}
          >
            Delete
          </Button>
        </>
      );
    } else {
      return (
        <Button
          variant="outline-primary"
          onClick={(event) => props.handleParams(movieId, event)}
        >
          Details
        </Button>
      );
    }
  };

  return (
    <Card
      className={`d-flex align-items-center text-center ${styles.movieCardContainer}`}
    >
      <Card.Img
        variant="top"
        src={movieImage}
        className={`${styles.movieImg}`}
      />
      <Card.Body
        className={`d-flex flex-column justify-content-between ${
          isNowShowing ? "test" : null
        } ${styles.movieCardBody}`}
      >
        <Card.Title className={`${styles.movieTitle}`}>{movieName}</Card.Title>
        <Card.Text className={`${styles.movieGenre}`}>
          {movieCategory}
        </Card.Text>
        <div>{renderMovieCardButton()}</div>
      </Card.Body>
    </Card>
  );
};

MovieCard.defaultProps = {
  movieName: "Title here",
  movieCategory: "category"
}

export default MovieCard;
