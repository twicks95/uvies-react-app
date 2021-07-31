import React, { Component } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import NowShowing from "../../../components/NowShowing/NowShowing";
import UpcomingMovies from "../../../components/UpcomingMovies/UpcomingMovies";
import JoinMember from "../../../components/JoinMember/JoinMember";
import Footer from "../../../components/Footer/Footer";
import Styles from "./Home.module.css";
import { connect } from "react-redux";
import { getNowShowingMovies } from "../../../redux/actions/movie";
import { getViewportWidth } from "../../../redux/actions/viewport";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const currentDate = this.getCurrentDate();
    this.props.getNowShowingMovies(currentDate, "", "");
  }

  getCurrentDate = () => {
    const d = new Date(Date.now());
    const dateNow = `${d.getFullYear()}-${
      d.getMonth().toString().length === 1
        ? `0${d.getMonth() + 1}`
        : d.getMonth() + 1
    }-${d.getDate().toString().length === 1 ? `0${d.getDate()}` : d.getDate()}`;
    return dateNow;
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
          <NowShowing />
          <UpcomingMovies />
          <JoinMember />
        </div>
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = { getNowShowingMovies };
export default connect(null, mapDispatchToProps)(Home);
