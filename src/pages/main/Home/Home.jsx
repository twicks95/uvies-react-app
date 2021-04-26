import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import NowShowing from "../../../components/NowShowing/NowShowing";
import UpcomingMovies from "../../../components/UpcomingMovies/UpcomingMovies";
import JoinMember from "../../../components/JoinMember/JoinMember";
import Footer from "../../../components/Footer/Footer";
import Styles from "./Home.module.css";
import axiosApiIntances from "../../../utils/axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    axiosApiIntances
      .get(`movie?limit=10`)
      .then((res) => {
        this.setState({ data: res.data.data });
        // console.log(res)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleDetail = (id) => {
    this.props.history.push(`/movie-detail?movieId=${id}`);
  };

  render() {
    return (
      <>
        <Navbar />
        <div className={`${Styles.contentWrapper}`}>
          <div className={`${Styles.heroSection}`}>
            <div
              className={`d-flex align-items-lg-center justify-content-lg-center w-100 w-lg-50 ${Styles.leftSection}`}
            >
              <p>
                Nearest Cinema, Newest Movie.
                <br />
                <span>Find out now!</span>
              </p>
            </div>
            <div
              className={`d-flex align-items-center justify-content-center w-100 w-lg-50 ${Styles.rightSection}`}
            >
              <div className={`${Styles.box1}`}></div>
              <div className={`${Styles.box2}`}></div>
              <div className={`${Styles.box3}`}></div>
            </div>
          </div>
          <NowShowing handleDetail={this.handleDetail} />
          <UpcomingMovies handleDetail={this.handleDetail} />
          <JoinMember />
        </div>
        <Footer />
      </>
    );
  }
}
