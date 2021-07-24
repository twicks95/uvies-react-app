import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import styles from "./DataSchedule.module.css";
import Ebv from "../../../../assets/img/ebu-id-logo.svg";
import Hiflix from "../../../../assets/img/hiflix-logo.svg";
import CineOne from "../../../../assets/img/cine-one-21-logo.svg";
import moment from "moment";

const DataSchedule = (props) => {
  const {
    handleLocation,
    handleMovie,
    handleSort,
    handlePremiereId,
    sort,
    showModal,
    // location,
    locationData2,
    movieData,
    movieName,
  } = props;
  const { data } = props.premiere.premieres;

  return (
    <>
      <div
        className={`d-flex flex-column flex-md-row justify-content-between mb-3 ${styles.movieDataHead}`}
      >
        <h3 className={`mb-4 mb-md-0`}>Schedule Data</h3>
        <div className={`d-flex align-items-center ${styles.searchAction}`}>
          <DropdownButton
            variant="outline-secondary"
            title={
              !sort
                ? "sort"
                : sort === "premiere_id ASC"
                ? "All"
                : sort === "premiere_name ASC"
                ? "Name"
                : "Currently Added"
            }
            id="sort"
            className={`me-3`}
          >
            <Dropdown.Item
              name="sort"
              id="premiere_id ASC"
              onClick={(e) => handleSort(e.target.id)}
            >
              Show All
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex justify-content-between"
              name="sort"
              id="premiere_name ASC"
              onClick={(e) => handleSort(e.target.id)}
            >
              By Name<b>a-z</b>
            </Dropdown.Item>
            <Dropdown.Item
              name="sort"
              id="premiere_created_at DESC"
              onClick={(e) => handleSort(e.target.id)}
            >
              By Currently Added
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item disabled>Uvies App</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title="Location"
            id="location"
            className={`me-3`}
          >
            <Dropdown.Item
              name="location"
              id=""
              onClick={(e) => handleLocation(e.target.id)}
            >
              <span className={styles.list}>All</span>
            </Dropdown.Item>
            {locationData2 ? (
              locationData2.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  name="location"
                  id={item.location_city}
                  onClick={(e) => handleLocation(e.target.id)}
                >
                  <span
                    className={styles.list}
                    id={item.location_city}
                    onClick={(e) => handleLocation(e.target.id)}
                  >
                    {item.location_city}
                  </span>
                </Dropdown.Item>
              ))
            ) : (
              <></>
            )}

            <Dropdown.Divider />
            <Dropdown.Item disabled>Uvies App</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title={!movieName ? "Movie" : movieName}
            id="movie"
            className={`me-3`}
          >
            <Dropdown.Item
              name="movie"
              id=""
              onClick={(e) => handleMovie(e.target.id)}
            >
              <span className={styles.list}>All</span>
            </Dropdown.Item>
            {movieData ? (
              movieData.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  name="movie"
                  id={item.movie_name}
                  onClick={(e) => handleMovie(e.target.id)}
                >
                  <span
                    className={styles.list}
                    id={item.movie_name}
                    onClick={(e) => handleMovie(e.target.id)}
                  >
                    {item.movie_name}
                  </span>
                </Dropdown.Item>
              ))
            ) : (
              <></>
            )}

            <Dropdown.Divider />
            <Dropdown.Item disabled>Uvies App</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <Row xs={1} md={2} lg={3} className={`g-4 m-0 border ${styles.wrapper} `}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <Col key={index}>
              <div className={styles.ticket}>
                <Row className="">
                  <Col
                    xs={12}
                    sm={5}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img
                      src={
                        item.premiere_name === "Ebv.id"
                          ? Ebv
                          : item.premiere_name === "Hiflix"
                          ? Hiflix
                          : CineOne
                      }
                      alt="premiere"
                      style={{ width: "100px" }}
                    />
                  </Col>
                  <Col xs={12} sm={7} className="text-center text-sm-start">
                    <h3>{item.premiere_name}</h3>
                    <span className={styles.address}>
                      {item.location_address}, {item.location_city}
                    </span>
                  </Col>
                  <hr className="mt-2" />
                </Row>
                <Row xs={4} className="gx-0 gy-3 text-center">
                  {item.schedule_clock.map((hour, index) => (
                    <Col className={styles.hour} key={index}>
                      {moment(`2021-12-12 ${hour}`).format("LT").toLowerCase()}
                    </Col>
                  ))}
                </Row>
                <div className={`mt-4 ${styles.actionBtnGroup}`}>
                  <div className="d-flex justify-content-between mb-4">
                    <span className={styles.price}>Price</span>
                    <span className={styles.priceNominal}>
                      IDR{item.premiere_price.toLocaleString("id-ID")}/seat
                    </span>
                  </div>
                  <Row className="g-3">
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className={styles.actionBtn}
                        onClick={() => props.handleUpdate(item.premiere_id)}
                      >
                        Update
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        className={styles.actionBtn}
                        onClick={() => {
                          showModal(true);
                          handlePremiereId(item.premiere_id);
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <p
            style={{
              fontSize: "2em",
              fontWeight: "700",
              margin: "auto",
              textAlign: "center",
            }}
          >
            No Data
          </p>
        )}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({ premiere: state.premiere });

export default connect(mapStateToProps, null)(withRouter(DataSchedule));
