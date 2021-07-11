import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./MovieCard.module.css";
import "./MovieCard.module.css";
import moment from "moment";
import ImagePlaceholder from "../../assets/img/default-img-placeholder.png";

const MovieCard = (props) => {
  const {
    isNowShowing,
    isAdminManageMovie,
    handleDetail,
    handleUpdate,
    handleDelete,
    data,
  } = props;
  const {
    movie_poster,
    movie_name,
    movie_category,
    movie_release_date,
    movie_id,
  } = data;

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
        <div>
          <Button
            variant="outline-primary"
            onClick={() => handleDetail(movie_id)}
          >
            Details
          </Button>
          <Button variant="primary">Book Now</Button>
        </div>
      );
    } else if (isAdminManageMovie) {
      return (
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => handleUpdate(data)}
          >
            Update
          </Button>
          <Button variant="danger" onClick={() => handleDelete(movie_id)}>
            Delete
          </Button>
        </div>
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
        isAdminManageMovie ? "me-0 mb-5" : "me-5"
      }  ${styles.movieCardContainer}`}
    >
      <Card.Img
        variant="top"
        src={
          movie_poster
            ? `${process.env.REACT_APP_API_MOVIE_POSTER_URL}/${movie_poster}`
            : ImagePlaceholder
        }
        className={`${styles.movieImg}`}
      />
      <Card.Body
        className={`d-flex flex-column justify-content-between ${
          isNowShowing ? "test" : null
        } ${styles.movieCardBody}`}
      >
        <Card.Title title={movie_name} className={`${styles.movieTitle}`}>
          {movie_name}
        </Card.Title>
        {renderMovieSubtitleAndText()}
        {renderMovieCardButton()}
      </Card.Body>
    </Card>
  );
};

MovieCard.defaultProps = {
  movieName: "Title here",
  movieCategory: "category",
};

export default MovieCard;
