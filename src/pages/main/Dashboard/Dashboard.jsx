import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { getMovies } from "../../../redux/actions/movie";
import axiosApiInstances from "../../../utils/axios";

const Dashboard = (props) => {
  const [movie, setMovie] = useState({ id: "", name: "" });
  const [premiere, setPremiere] = useState("");
  const [location, setLocation] = useState({ id: "", name: "" });
  const [locationData, setLocationData] = useState([]);
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    props.getMovies("", "", "", "");
    axiosApiInstances.get("premiere/location?noGroup=true").then((res) => {
      setLocationData(res.data.data);
    });
    axiosApiInstances
      .get(
        `booking/data/dashboard?movieId=${movie.id}&premiere=${premiere}&locationId=${location.id}`
      )
      .then((res) => {
        setEarnings(res.data.data);
      });
  }, []);

  useEffect(() => {
    axiosApiInstances
      .get(
        `booking/data/dashboard?movieId=${movie.id}&premiere=${premiere}&locationId=${location.id}`
      )
      .then((res) => {
        setEarnings(res.data.data);
      });
  }, [movie.id, premiere, location.id]);

  // const handleFilter = () => {};

  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "#total income",
        data: [
          earnings.length > 0 && earnings[0].month === 1
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 2
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 3
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 4
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 5
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 6
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 7
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 8
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 9
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 10
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 11
            ? earnings[0].total
            : 0,
          earnings.length > 0 && earnings[0].month === 12
            ? earnings[0].total
            : 0,
        ],
        fill: false,
        backgroundColor: "#5f2eea",
        borderColor: "rgba(96, 46, 234, 0.302)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  console.log({ premiere, locationData, location, movie, earnings });
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <Row className="g-5 g-md-3">
          <Col xs={12} md={9}>
            <h1>Dashboard</h1>
            <div className={styles.contentWrapper}>
              <Line data={data} options={options} />
            </div>
          </Col>
          <Col xs={12} md={3} style={{ height: "400px" }}>
            <h1>Filtered</h1>
            <div
              className={`d-flex flex-column justify-content-evenly h-100 ${styles.contentWrapper}`}
            >
              <DropdownButton
                id="dropdown-basic-button"
                title={movie.name ? movie.name : "Select Movie"}
                className={styles.filter}
              >
                <Dropdown.Item
                  id=""
                  name="All"
                  className={styles.dropdownItem}
                  onClick={(e) =>
                    setMovie({ id: e.target.id, name: e.target.name })
                  }
                >
                  All
                </Dropdown.Item>
                {props.movie.movies.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    id={item.movie_id}
                    name={item.movie_name}
                    className={styles.dropdownItem}
                    onClick={(e) =>
                      setMovie({ id: e.target.id, name: e.target.name })
                    }
                  >
                    {item.movie_name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                id="dropdown-basic-button"
                title={premiere ? premiere : "Select Premiere"}
                className={styles.filter}
              >
                <Dropdown.Item id="" onClick={(e) => setPremiere(e.target.id)}>
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  id="CineOne21"
                  onClick={(e) => setPremiere(e.target.id)}
                >
                  CineOne21
                </Dropdown.Item>
                <Dropdown.Item
                  id="Ebv.id"
                  onClick={(e) => setPremiere(e.target.id)}
                >
                  Ebv.id
                </Dropdown.Item>
                <Dropdown.Item
                  id="Hiflix"
                  onClick={(e) => setPremiere(e.target.id)}
                >
                  Hiflix
                </Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                id="dropdown-basic-button"
                title={location.name ? location.name : "Select Location"}
                className={styles.filter}
              >
                <Dropdown.Item
                  id=""
                  name="All"
                  className={styles.dropdownItem}
                  onClick={(e) =>
                    setLocation({ id: e.target.id, name: e.target.name })
                  }
                >
                  <span>All</span>
                </Dropdown.Item>
                {locationData.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    id={item.location_id}
                    name={item.location_city}
                    className={styles.dropdownItem}
                    onClick={(e) =>
                      setLocation({ id: e.target.id, name: e.target.name })
                    }
                  >
                    <span>{item.location_city}</span>
                    <p>{item.location_address}</p>
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <div className="d-flex flex-column gap-2">
                <Button className={styles.actionBtn}>Filter</Button>
                <Button className={styles.actionBtn}>Reset</Button>
              </div>
            </div>
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({ movie: state.movie });
const mapDispatchToProps = { getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
