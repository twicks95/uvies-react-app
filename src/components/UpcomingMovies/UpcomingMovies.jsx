import React, { Component } from "react";
import styles from "./UpcomingMovies.module.css";
import { Button } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import axiosApiIntances from "../../utils/axios";

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
      data: [],
      activeMonth: month[this.currentMonth.getMonth()],
    };
    // this.handleUpcoming = props.handleUpcomingMoviesByMonth;
    this.handleDetail = props.handleDetail;
  }

  componentDidMount() {
    this.getUpcomingMovies(this.currentMonth.getMonth() + 1);
  }

  getUpcomingMovies = (month) => {
    axiosApiIntances
      .get(`movie/upcoming/${month}`)
      .then((res) => {
        this.setState({ data: res.data.data });
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  handleChangeMonthButton = (e, month) => {
    this.setState({
      activeMonth: e.target.innerHTML,
    });
    this.getUpcomingMovies(month);
  };

  renderUpcomingMovies = (month) => {
    const { data } = this.state;
    if (data.length > 0) {
      return data.map((item, index) => {
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
    // const { handleDetail } = this.props;
    return (
      <section className={`d-flex flex-column ${styles.upcomingMovies}`}>
        <div
          className={`d-flex align-items-center justify-content-between w-100`}
        >
          <h4>Upcoming Movies</h4>
          <a className={`text-decoration-none ${styles.btnViewAll}`} href="/">
            view all
          </a>
        </div>
        <div className={`d-flex overflow-auto ${styles.monthsList}`}>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "January" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 1)}
          >
            January
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "February" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 2)}
          >
            February
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "March" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 3)}
          >
            March
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "April" ? `${styles.active}` : null
            }
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
            className={
              activeMonth === "August" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 8)}
          >
            August
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "September" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 9)}
          >
            September
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "October" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 10)}
          >
            October
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "November" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 11)}
          >
            November
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonth === "Desember" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonthButton(e, 11)}
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

export default UpcomingMovies;
