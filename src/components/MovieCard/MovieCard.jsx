import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./MovieCard.module.css";
import "./MovieCard.module.css";
import moment from "moment";

import movieImage from "../../assets/img/john-wick-3.png";

const MovieCard = (props) => {
  const {
    isNowShowing,
    isAdminManageMovie,
    handleDetail,
    handleUpdate,
    handleDelete,
    data,
  } = props;
  const { movie_name, movie_category, movie_release_date, movie_id } = data;

  const renderMovieSubtitleAndText = () => {
    if (isAdminManageMovie) {
      return (
        <>
          <Card.Subtitle>
            {moment(movie_release_date).format("MMM Do, YYYY")}
          </Card.Subtitle>
          <Card.Text className={`${styles.movieGenre}`}>
            {movie_category}
          </Card.Text>
        </>
      );
    } else {
      return (
        <Card.Text className={`${styles.movieGenre}`}>
          {movie_category}
        </Card.Text>
      );
    }
  };
  
  const renderMovieCardButton = () => {
    if (isNowShowing) {
      return (
        <>
          <Button
            variant="outline-primary"
            onClick={() => handleDetail(movie_id)}
          >
            Details
          </Button>
          <Button variant="primary">Book Now</Button>
        </>
      );
    } else if (isAdminManageMovie) {
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
          onClick={() => handleDetail(movie_id)}
        >
          Details
        </Button>
      );
    }
  };

  return (
    <Card
      className={`d-flex align-items-center text-center ${
        isAdminManageMovie ? "mr-0 mb-5" : "mr-5"
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
        {/* <div> */}
        <Card.Title className={`${styles.movieTitle}`}>{movie_name}</Card.Title>
        {renderMovieSubtitleAndText()}
        {/* </div> */}
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
