import React, { Component } from "react";
import { connect } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./NowShowing.module.css";
import Loading from "../../assets/icons/Ellipsis-1.4s-70px.svg";
import { FilmIcon } from "@heroicons/react/outline";

class NowShowing extends Component {
  render() {
    const { nowShowing, isLoading } = this.props.movie;
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
          {isLoading.nowShowing ? (
            <div style={{ margin: "auto" }}>
              <span>Loading </span>
              <img
                src={Loading}
                alt="loading"
                style={{ height: "1em" }}
                className="text-center"
              />
            </div>
          ) : nowShowing.length > 0 ? (
            nowShowing.map((item, index) => {
              return <MovieCard data={item} isNowShowing={true} key={index} />;
            })
          ) : (
            <h6 className={styles.emptyMessage}>
              Sorry! There are no movie shows for today.{" "}
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
export default connect(mapStateToProps, null)(NowShowing);
