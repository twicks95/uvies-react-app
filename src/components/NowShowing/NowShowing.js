import React, { Component } from "react";
import MovieCard from "./MovieCard/MovieCard";
import Styles from "./NowShowing.module.css"

export default class NowShowing extends Component {
  render() {
    const {dataMovies} = this.props
    return (
      <section className={`d-flex flex-column ${Styles.nowShowing}`}>
        <div className={`d-flex align-items-center justify-content-between w-100`}>
          <h4>Now Showing</h4>
          <a className={`text-decoration-none ${Styles.btnViewAll}`} href="/now-showing-movies">
            view all
          </a>
        </div>
        <div className={`d-flex overflow-auto ${Styles.nowShowingList}`}>
          {dataMovies.map((item, index) => {
            return(
              <MovieCard movieName={item.movie_name} movieCategory={item.movie_category} key={index}/>
            )
          })}
          
        </div>
      </section>
    );
  }
}
