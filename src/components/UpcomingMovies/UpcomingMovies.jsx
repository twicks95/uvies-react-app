import React, { Component } from "react";
import { connect } from "react-redux";
import { getUpcomingMovies } from "../../redux/actions/movie";
import styles from "./UpcomingMovies.module.css";
import { Button } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import { FilmIcon } from "@heroicons/react/outline";
import Loading from "../../assets/icons/Ellipsis-1.4s-70px.svg";

class UpcomingMovies extends Component {
  constructor(props) {
    super(props);
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Desember",
    ];
    this.currentMonth = new Date();
    this.state = {
      activeMonth: month[this.currentMonth.getMonth()],
      upcomingMovies: this.props.movie.upcomingMovies,
    };
  }

  componentDidMount() {
    this.props.getUpcomingMovies(this.currentMonth.getMonth() + 1);
  }

  handleClickMonth = (e, month) => {
    this.setState({
      activeMonth: e.target.innerHTML,
    });
    this.props.getUpcomingMovies(month);
  };

  render() {
    const { upcomingMovies } = this.props.movie;
    const { activeMonth } = this.state;
    const { upcoming } = this.props.movie.isLoading;
    const loading = { upcoming };

    return (
      <section className={`d-flex flex-column ${styles.upcomingMovies}`}>
        <div className={`d-flex align-items-end justify-content-between w-100`}>
          <h4>Upcoming Movies</h4>
          <a className={`text-decoration-none ${styles.btnViewAll}`} href="/">
            view all
          </a>
        </div>
        <div className={`d-flex overflow-auto ${styles.monthsList}`}>
          <Button
            variant="outline-primary"
            className={activeMonth === "January" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 1)}
          >
            January
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "February" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 2)}
          >
            February
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "March" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 3)}
          >
            March
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "April" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 4)}
          >
            April
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "May" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 5)}
          >
            May
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "June" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 6)}
          >
            June
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "July" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 7)}
          >
            July
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "August" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 8)}
          >
            August
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "September" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 9)}
          >
            September
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "October" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 10)}
          >
            October
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "November" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 11)}
          >
            November
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "Desember" ? `${styles.active}` : null}
            onClick={(e) => this.handleClickMonth(e, 12)}
          >
            Desember
          </Button>
        </div>
        <div
          className={`d-flex overflow-auto ${styles.upcomingList} ${
            upcomingMovies.length < 1 || loading.upcoming
              ? "justify-content-center"
              : null
          }`}
        >
          {loading.upcoming ? (
            <div>
              <span>Loading </span>
              <img
                src={Loading}
                alt="loading"
                style={{ height: "1em" }}
                className="text-center"
              />
            </div>
          ) : upcomingMovies.length > 0 ? (
            upcomingMovies.map((item, index) => (
              <MovieCard data={item} key={index} />
            ))
          ) : (
            <h6 style={{ color: "#8692A6" }} className="text-center">
              There are no upcoming movies in {activeMonth}{" "}
              <FilmIcon
                style={{ height: "1.2em", transform: "rotate(10deg)" }}
              />
            </h6>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ movie: state.movie });
const mapDispatchToProps = { getUpcomingMovies };

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
