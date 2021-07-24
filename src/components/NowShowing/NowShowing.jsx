import React, { Component } from "react";
import { connect } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./NowShowing.module.css";

class NowShowing extends Component {
  render() {
    const { nowShowing } = this.props.movie;
    return (
      <section className={`d-flex flex-column ${styles.nowShowing}`}>
        <div className={`d-flex align-items-end justify-content-between w-100`}>
          <h4>Now Showing</h4>
          <a
            className={`text-decoration-none ${styles.btnViewAll}`}
            href="/now-showing-movies"
          >
            view all
          </a>
        </div>
        <div className={`d-flex overflow-auto ${styles.nowShowingList}`}>
          {nowShowing.length > 0 ? (
            nowShowing.map((item, index) => {
              return <MovieCard data={item} isNowShowing={true} key={index} />;
            })
          ) : (
            <span className={styles.emptyMessage}>
              Sorry, there are no movie shows for today.
            </span>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ movie: state.movie });
export default connect(mapStateToProps, null)(NowShowing);
