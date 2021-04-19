import React, { Component } from "react";
import Styles from "./UpcomingMovies.module.css";
import { Button } from "react-bootstrap";
import MovieCard from "./MovieCard/MovieCard";

export default class UpcomingMovies extends Component {
  render() {
    return (
      <section className={`d-flex flex-column ${Styles.upcomingMovies}`}>
        <div
          className={`d-flex align-items-center justify-content-between w-100`}
        >
          <h4>Upcoming Movies</h4>
          <a className={`text-decoration-none ${Styles.btnViewAll}`} href="/">
            view all
          </a>
        </div>
        <div className={`d-flex overflow-auto ${Styles.monthsList}`}>
          <Button variant="outline-primary">January</Button>
          <Button variant="outline-primary">February</Button>
          <Button variant="outline-primary">March</Button>
          <Button variant="outline-primary">April</Button>
          <Button variant="outline-primary">May</Button>
          <Button variant="outline-primary">June</Button>
          <Button variant="outline-primary">July</Button>
          <Button variant="outline-primary">August</Button>
          <Button variant="outline-primary">September</Button>
          <Button variant="outline-primary">October</Button>
          <Button variant="outline-primary">November</Button>
          <Button variant="outline-primary">Desember</Button>
        </div>
        <div class={`d-flex overflow-auto ${Styles.upcomingList}`}>
          {/* <div class="card d-flex align-items-center text-center">
            <img
              src="./assets/img/black-widow.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Black Widow</h5>
              <p class="card-text">Action, Adventure, Sci-Fi</p>
              <a href="movie-details.html" class="btn btn-outline-primary">
                Details
              </a>
            </div>
          </div> */}
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </section>
    );
  }
}
