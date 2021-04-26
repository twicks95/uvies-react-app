import React, { Component } from "react";
import axiosApiIntances from "../../utils/axios";
import MovieCard from "../MovieCard/MovieCard";
import Styles from "./NowShowing.module.css";

class NowShowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getNowShowingMovie();
  }

  getNowShowingMovie = () => {
    axiosApiIntances
      .get("movie?limit")
      .then((res) => {
        this.setState({ data: res.data.data });
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  render() {
    const { data } = this.state;
    const { handleDetail } = this.props;
    return (
      <section className={`d-flex flex-column ${Styles.nowShowing}`}>
        <div
          className={`d-flex align-items-center justify-content-between w-100`}
        >
          <h4>Now Showing</h4>
          <a
            className={`text-decoration-none ${Styles.btnViewAll}`}
            href="/now-showing-movies"
          >
            view all
          </a>
        </div>
        <div className={`d-flex overflow-auto ${Styles.nowShowingList}`}>
          {data.map((item, index) => {
            return (
              <MovieCard
                data={item}
                handleDetail={handleDetail}
                isNowShowing={true}
                key={index}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default NowShowing;
