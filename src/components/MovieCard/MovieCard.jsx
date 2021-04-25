import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./MovieCard.module.css";
import "./MovieCard.module.css";

import movieImage from "../../assets/img/john-wick-3.png";

const MovieCard = (props) => {
  const {
    isNowShowing,
    isAdminMovieData,
    handleParams,
    handleUpdate,
    handleDelete,
    data,
  } = props;
  const { movie_name, movie_category, movie_id } = data;

  const renderMovieCardButton = () => {
    if (isNowShowing) {
      return (
        <>
          <Button
            variant="outline-primary"
            onClick={(event) => handleParams(movie_id, event)}
          >
            Details
          </Button>
          <Button
            variant="primary"
            onClick={(event) => handleParams(movie_id, event)}
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
            onClick={() => handleUpdate(data)}
          >
            Update
          </Button>
          <Button variant="danger" onClick={() => handleDelete(movie_id)}>
            Delete
          </Button>
        </>
      );
    } else {
      return (
        <Button
          variant="outline-primary"
          onClick={(event) => handleParams(movie_id, event)}
        >
          Details
        </Button>
      );
    }
  };

  return (
    <Card
      className={`d-flex align-items-center text-center ${
        isAdminMovieData ? "mr-0 mb-5" : "mr-5"
      }  ${styles.movieCardContainer}`}
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
        <Card.Title className={`${styles.movieTitle}`}>{movie_name}</Card.Title>
        <Card.Text className={`${styles.movieGenre}`}>
          {movie_category}
        </Card.Text>
        <div>{renderMovieCardButton()}</div>
      </Card.Body>
    </Card>
  );
};

MovieCard.defaultProps = {
  movieName: "Title here",
  movieCategory: "category",
};

export default MovieCard;
