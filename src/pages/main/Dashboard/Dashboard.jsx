import { useEffect } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const Dashboard = (props) => {
  // const [movie, setMovie] = useState("");
  // const [premiere, setPremiere] = useState("");
  // const [location, setLocation] = useState("");

  useEffect(() => {}, []);

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
        data: [12, 19, 3, 5, 2, 3, 0, 0, 0, 0, 0, 0],
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
                title="Select Movie"
                className={styles.filter}
              >
                <Dropdown.Item id="id movie">Action</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                id="dropdown-basic-button"
                title="Select Premiere"
                className={styles.filter}
              >
                <Dropdown.Item id="id premiere">Action</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                id="dropdown-basic-button"
                title="Select Location"
                className={styles.filter}
              >
                <Dropdown.Item id="id lokasi">Action</Dropdown.Item>
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

export default Dashboard;
