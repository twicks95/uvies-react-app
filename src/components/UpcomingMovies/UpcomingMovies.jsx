import React, { Component } from "react";
import { connect } from "react-redux";
import { getUpcomingMovies } from "../../redux/actions/movie";
import styles from "./UpcomingMovies.module.css";
import { Button } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

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
    };
    this.handleDetail = props.handleDetail;
  }

  componentDidMount() {
    this.props.getUpcomingMovies(this.currentMonth.getMonth() + 1);
  }

  handleChangeMonthButton = (e, month) => {
    this.setState({
      activeMonth: e.target.innerHTML,
    });
    this.props.getUpcomingMovies(month);
  };

  renderUpcomingMovies = (month) => {
    const { upcomingMovies } = this.props.movie;
    if (upcomingMovies.length > 0) {
      return upcomingMovies.map((item, index) => {
        return (
          <MovieCard data={item} handleDetail={this.handleDetail} key={index} />
        );
      });
    } else {
      return (
        <>
          <h3>No upcoming movie in {month}</h3>
        </>
      );
    }
  };

  render() {
    const { activeMonth } = this.state;
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
            onClick={(e) => this.handleChangeMonthButton(e, 1)}
          >
            January
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "February" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 2)}
          >
            February
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "March" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 3)}
          >
            March
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "April" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 4)}
          >
            April
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "May" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 5)}
          >
            May
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "June" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 6)}
          >
            June
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "July" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 7)}
          >
            July
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "August" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 8)}
          >
            August
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "September" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 9)}
          >
            September
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "October" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 10)}
          >
            October
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "November" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 11)}
          >
            November
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonth === "Desember" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonthButton(e, 12)}
          >
            Desember
          </Button>
        </div>
        <div className={`d-flex overflow-auto ${styles.upcomingList}`}>
          {this.renderUpcomingMovies(activeMonth)}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ movie: state.movie });
const mapDispatchToProps = { getUpcomingMovies };

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
