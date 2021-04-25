import React, { Component } from "react";
import styles from "./UpcomingMovies.module.css";
import { Button } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

class UpcomingMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMonthButton: "",
    };
  }

  handleChangeMonth = (e) => {
    // console.log(e.target.innerHTML)
    this.setState({
      activeMonthButton: e.target.innerHTML,
    });
  };

  render() {
    const { activeMonthButton } = this.state;
    const { dataMovies, handleParams } = this.props;
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
              activeMonthButton === "January" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            January
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "February" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            February
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "March" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            March
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "April" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            April
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonthButton === "May" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonth(e)}
          >
            May
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonthButton === "June" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonth(e)}
          >
            June
          </Button>
          <Button
            variant="outline-primary"
            className={activeMonthButton === "July" ? `${styles.active}` : null}
            onClick={(e) => this.handleChangeMonth(e)}
          >
            July
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "August" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            August
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "September" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            September
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "October" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            October
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "November" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            November
          </Button>
          <Button
            variant="outline-primary"
            className={
              activeMonthButton === "Desember" ? `${styles.active}` : null
            }
            onClick={(e) => this.handleChangeMonth(e)}
          >
            Desember
          </Button>
        </div>
        <div className={`d-flex overflow-auto ${styles.upcomingList}`}>
          {dataMovies.map((item, index) => {
            return (
              <MovieCard data={item} handleParams={handleParams} key={index} />
            );
          })}
        </div>
      </section>
    );
  }
}

export default UpcomingMovies;
