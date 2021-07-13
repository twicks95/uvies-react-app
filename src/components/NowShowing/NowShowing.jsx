import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../redux/actions/movie";
import MovieCard from "../MovieCard/MovieCard";
import Styles from "./NowShowing.module.css";

class NowShowing extends Component {
  componentDidMount() {
    this.props.getMovies("", "", "1", "10");
  }

  render() {
    const { movies } = this.props.movie;
    const { handleDetail } = this.props;
    return (
      <section className={`d-flex flex-column ${Styles.nowShowing}`}>
        <div className={`d-flex align-items-end justify-content-between w-100`}>
          <h4>Now Showing</h4>
          <a
            className={`text-decoration-none ${Styles.btnViewAll}`}
            href="/now-showing-movies"
          >
            view all
          </a>
        </div>
        <div className={`d-flex overflow-auto ${Styles.nowShowingList}`}>
          {movies ? (
            movies.map((item, index) => {
              return (
                <MovieCard
                  data={item}
                  handleDetail={handleDetail}
                  isNowShowing={true}
                  key={index}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ movie: state.movie });
const mapDispatchToProps = { getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(NowShowing);
