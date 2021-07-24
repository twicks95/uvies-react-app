/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getPremieres } from "../../../redux/actions/premiere";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import DataSchedule from "./DataSchedule/DataSchedule";
import styles from "./ManageSchedule.module.css";
import ReactPaginate from "react-paginate";
import ImagePlaceholder from "../../../assets/img/default-img-placeholder.png";
import Ebv from "../../../assets/img/ebu-id-logo.svg";
import Hiflix from "../../../assets/img/hiflix-logo.svg";
import CineOne from "../../../assets/img/cine-one-21-logo.svg";
import { useEffect, useState } from "react";
import axiosApiInstances from "../../../utils/axios";
import {
  // XIcon,
  XCircleIcon,
  CheckCircleIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import moment from "moment";

const ManageSchedule = (props) => {
  const [msg, setMsg] = useState({ create: "", delete: "" });
  const [sort, setSort] = useState("");
  const [image, setImage] = useState("");
  const [movie, setMovie] = useState("");
  const [movieName, setMovieName] = useState("");
  const [price, setPrice] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState("");
  const [premiere, setPremiere] = useState("");
  const [premiereId, setPremiereId] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [showToast, setShowToast] = useState({ create: false, delete: false });
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [update, setUpdate] = useState(false);
  const [scheduleClock, setScheduleClock] = useState([]);
  const [error, setError] = useState({ create: false, delete: false });
  const [page, setPage] = useState("1");
  const [pagination, setPagination] = useState({});
  const [movieData, setMovieData] = useState([]);
  const [locationData1, setLocationData1] = useState([]);
  const [locationData2, setLocationData2] = useState([]);
  const [clockList, setClockList] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [movieNameFilter, setMovieNameFilter] = useState("");
  const [addClock, setAddClock] = useState(false);
  const [clock, setClock] = useState("");
  const limit = "6";

  useEffect(() => {
    props
      .getPremieres(
        movie,
        premiere,
        locationFilter,
        movieNameFilter,
        sort,
        page,
        limit
      )
      .then((res) => {
        setPagination(res.action.payload.data.pagination);
      });

    movieNameFilter && locationFilter && sort
      ? props.history.push(
          `/manage/schedule?movieName=${movieNameFilter}&location=${locationFilter}&sort=${sort}&page=${page}`
        )
      : locationFilter && sort
      ? props.history.push(
          `/manage/schedule?location=${locationFilter}&sort=${sort}&page=${page}`
        )
      : movieNameFilter && sort
      ? props.history.push(
          `/manage/schedule?movieName=${movieNameFilter}&sort=${sort}&page=${page}`
        )
      : movieNameFilter
      ? props.history.push(
          `/manage/schedule?movieName=${movieNameFilter}&page=${page}`
        )
      : location
      ? props.history.push(
          `/manage/schedule?location=${locationFilter}&page=${page}`
        )
      : sort
      ? props.history.push(`/manage/schedule?sort=${sort}&page=${page}`)
      : props.history.push(`/manage/schedule?page=${page}`);
  }, [page, locationFilter, movieNameFilter, sort]);

  useEffect(() => {
    axiosApiInstances.get("movie").then((res) => {
      setMovieData(res.data.data);
    });
    axiosApiInstances.get("premiere/location?noGroup=true").then((res) => {
      setLocationData1(res.data.data);
    });
    axiosApiInstances.get("premiere/location").then((res) => {
      setLocationData2(res.data.data);
    });
  }, []);

  const getPremieres = () => {
    props
      .getPremieres(
        movie,
        premiere,
        locationFilter,
        movieNameFilter,
        sort,
        page,
        limit
      )
      .then((res) => {
        setPagination(res.action.payload.data.pagination);
      });
  };

  const createData = (e) => {
    e.preventDefault();
    if (
      movie &&
      locationId &&
      premiere &&
      price &&
      dateStart &&
      dateEnd &&
      clockList.length > 0
    ) {
      const setData = {
        movieId: movie,
        locationId: locationId,
        premiereName: premiere,
        premierePrice: price,
        scheduleDateStart: dateStart,
        scheduleDateEnd: dateEnd,
        scheduleClock: clockList.sort(),
      };

      axiosApiInstances
        .post("premiere", setData)
        .then((res) => {
          setShowToast({ ...showToast, create: true });
          setMsg({ ...msg, create: res.data.msg });
          handleResetForm();
          getPremieres();
        })
        .catch((err) => setError(err.payload.data.msg));
    } else {
      setShowModal2(true);
    }
  };

  const updateData = () => {};
  const handleResetForm = () => {
    resetForm();
  };

  const handleDeletePremiere = () => {
    axiosApiInstances
      .delete(`premiere/${premiereId}`)
      .then((res) => {
        setShowToast({ ...showToast, delete: true });
        setMsg({ ...msg, delete: res.data.msg });
        setPremiereId("");
        getPremieres();
      })
      .catch((err) => {
        console.log(err.response);
        // setError({ ...error, delete: err.response.data.msg });
      });
  };

  const setForm = (id) => {
    setUpdate(true);
    axiosApiInstances.get(`premiere/2?premiereId=${id}`).then((res) => {
      console.log(res.data.data[0]);
      const {
        movie_name,
        movie_id,
        location_address,
        location_id,
        premiere_id,
        movie_poster,
        premiere_name,
        premiere_price,
        schedule_clock,
        schedule_date_start,
        schedule_date_end,
      } = res.data.data[0];
      setScheduleClock(schedule_clock);
      setMovie(movie_id);
      setMovieName(movie_name);
      setLocation(location_address);
      setLocationId(location_id);
      setImage(movie_poster);
      setPrice(premiere_price);
      setPremiere(premiere_name);
      setPremiereId(premiere_id);
      setDateEnd(schedule_date_end.substr(0, 10));
      setDateStart(schedule_date_start.substr(0, 10));
    });
  };

  const resetForm = () => {
    setClock("");
    setImage("");
    setMovie("");
    setPrice("");
    setDateEnd("");
    setPremiere("");
    setLocation("");
    setMovieName("");
    setLocationId("");
    setDateStart("");
    setPremiereId("");
    setUpdate(false);
    setAddClock(false);
    setClockList([]);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);

    sort && location && movie
      ? props.history.push(
          `/manage/schedule?movieId=${movie}&sort=${sort}&page=${page}`
        )
      : sort && location
      ? props.history.push(
          `/manage/schedule?location=${location}&sort=${sort}&page=${page}`
        )
      : location && movie
      ? props.history.push(
          `/manage/schedule?location=${location}&movie=${movie}&page=${page}`
        )
      : sort && movie
      ? props.history.push(
          `/manage/schedule?movie=${movie}&sort=${sort}&page=${page}`
        )
      : props.history.push(`/manage/schedule?page=${page}`);
  };

  const handleSetClockList = () => {
    setClockList([...clockList, clock]);
  };

  const removeClockListItem = (clock) => {
    const index = clockList.indexOf(clock);
    if (index > -1) {
      clockList.splice(index, 1);
    }
    setClockList(clockList);
    props.history.push(`${props.location.pathname}${props.location.search}`);
  };

  console.log({
    image,
    scheduleClock,
    movie,
    movieName,
    premiere,
    premiereId,
    location,
    locationId,
    dateStart,
    dateEnd,
    props,
  });
  return (
    <>
      <Modal
        size="sm"
        show={showModal2}
        onHide={() => setShowModal2(false)}
        centered
      >
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center pt-0 pb-5">
          <h4
            style={{
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: ".75px",
            }}
          >
            Required Field!
          </h4>
          <ExclamationCircleIcon
            className="text-warning"
            style={{
              height: "50px",
              marginTop: "20px",
            }}
          />
          <p style={{ textAlign: "center", width: "80%" }}>
            Fulfill the required field.
          </p>
        </Modal.Body>
      </Modal>
      <Navbar loginStatus={true} />
      <Container fluid as={`main`} className={`${styles.mainWrapper}`}>
        {/* CONFIRM MODAL */}
        <Modal
          size="sm"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm">
              Delete Premiere
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-start">
            Are you sure want to delete this data?
            <Alert
              variant="danger"
              className="d-flex flex-column align-items-center justify-content-center text-bold text-center mt-3"
              style={{
                fontSize: ".8em",
                fontWeight: "600",
                backgroundColor: "#ff9aa4",
                color: "#b91929",
              }}
            >
              <ExclamationIcon style={{ height: "28px" }} />
              Warning! This action will permanently delete the data in database
              and cannot be restored.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ height: "36px", padding: "0px 10%" }}
              variant="light"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
            <Button
              style={{ height: "36px", padding: "0px 10%" }}
              variant="danger"
              onClick={() => handleDeletePremiere()}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END OF CONFIRM MODAL */}
        {/* TOAST */}
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 0,
            zIndex: 1,
          }}
        >
          <Toast
            onClose={() => setShowToast({ ...showToast, create: false })}
            show={showToast.create}
            delay={5000}
            autohide
            className={styles.toastSuccess}
            style={{ backgroundColor: "white", width: "400px" }}
          >
            <Toast.Header>
              {error.create ? (
                <XCircleIcon style={{ color: "#ea2e2e" }} />
              ) : (
                <CheckCircleIcon style={{ color: "#5f2eea" }} />
              )}
              <strong className="me-auto">Create Premiere</strong>
            </Toast.Header>
            <Toast.Body>{msg.create}</Toast.Body>
          </Toast>
          <Toast
            onClose={() => setShowToast({ ...showToast, delete: false })}
            show={showToast.delete}
            delay={5000}
            autohide
            className={styles.toastSuccess}
            style={{ backgroundColor: "white", width: "400px" }}
          >
            <Toast.Header>
              {error.delete ? (
                <XCircleIcon style={{ color: "#ea2e2e" }} />
              ) : (
                <CheckCircleIcon style={{ color: "#5f2eea" }} />
              )}
              <strong className="me-auto">Delete Premiere</strong>
            </Toast.Header>
            <Toast.Body>{msg.delete}</Toast.Body>
          </Toast>
        </div>
        {/* END OF TOAST */}
        <Row xs={1}>
          <form
            onSubmit={update ? (e) => updateData(e) : (e) => createData(e)}
            onReset={handleResetForm}
          >
            <Col className={`${styles.movieForm}`}>
              <h3 className={`mb-3`}>Schedule Form</h3>
              <Row xs={1} md={2} lg={3} className={`g-5 ${styles.wrapper} m-0`}>
                <Col lg={3}>
                  <Card
                    className={`d-flex justify-content-center ${styles.moviePoster}`}
                  >
                    <div className={`${styles.movieImg}`}>
                      <Card.Img
                        variant="top"
                        src={
                          !image
                            ? ImagePlaceholder
                            : `${process.env.REACT_APP_API_MOVIE_POSTER_URL}/${image}`
                        }
                      />
                    </div>
                  </Card>
                </Col>
                <Col lg={4} className={`${styles.test}`}>
                  <Form.Group controlId="movie" className={styles.formGroup}>
                    <Form.Label>
                      Movie{" "}
                      <span className={!movie ? styles.show : styles.hide}>
                        (Required field)
                      </span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={!movie ? styles.redBorder : ""}
                      onChange={(e) => {
                        setImage(e.target[e.target.selectedIndex].value);
                        setMovie(e.target[e.target.selectedIndex].id);
                      }}
                    >
                      <option>Select Movie</option>
                      {movieData.length > 0 ? (
                        movieData.map((item, index) => (
                          <option
                            key={index}
                            id={item.movie_id}
                            value={item.movie_poster}
                          >
                            {item.movie_name}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </Form.Control>
                  </Form.Group>
                  <Row xs={2}>
                    <Col>
                      <Form.Group controlId="name" className={styles.formGroup}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Choose premiere"
                          name="name"
                          value={premiere}
                          style={{ pointerEvents: "none" }}
                          className={!premiere ? styles.redBorder : ""}
                          onChange={(e) => setPremiere(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId="price"
                        className={styles.formGroup}
                      >
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="10"
                          name="price"
                          value={price}
                          className={!price ? styles.redBorder : ""}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <label className="mb-3">Premiere</label>
                  <Row xs={3}>
                    <Col>
                      <div
                        id="Ebv.id"
                        className={styles.premiereLogo}
                        onClick={(e) => setPremiere(e.target.id)}
                      >
                        <img id="Ebv.id" src={Ebv} alt="Ebv.id" />
                      </div>
                    </Col>
                    <Col>
                      <div
                        id="Hiflix"
                        className={styles.premiereLogo}
                        onClick={(e) => setPremiere(e.target.id)}
                      >
                        <img id="Hiflix" src={Hiflix} alt="Hiflix" />
                      </div>
                    </Col>
                    <Col>
                      <div
                        id="CineOne"
                        className={styles.premiereLogo}
                        onClick={(e) => setPremiere(e.target.id)}
                      >
                        <img id="CineOne" src={CineOne} alt="CineOne" />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={12} lg={5}>
                  <Form.Group controlId="location" className={styles.formGroup}>
                    <Form.Label>
                      Location{" "}
                      <span className={!locationId ? styles.show : styles.hide}>
                        (Required field)
                      </span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={!locationId ? styles.redBorder : ""}
                      onChange={(e) => {
                        setLocationId(e.target[e.target.selectedIndex].id);
                      }}
                    >
                      <option>Select Location</option>
                      {locationData1.length > 0 ? (
                        locationData1.map((item, index) => (
                          <option key={index} id={item.location_id}>
                            {item.location_city}
                            {item.location_address}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </Form.Control>
                  </Form.Group>
                  <Row xs={2}>
                    {/* SCHEDULE DATE INPUT */}
                    <Col>
                      <Form.Group
                        controlId="dateStart"
                        className={styles.formGroup}
                      >
                        <Form.Label>Date Start</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateStart"
                          className={!dateStart ? styles.redBorder : ""}
                          value={dateStart}
                          onChange={(e) => setDateStart(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId="dateEnd"
                        className={styles.formGroup}
                      >
                        <Form.Label>Date End</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateEnd"
                          value={dateEnd}
                          className={!dateEnd ? styles.redBorder : ""}
                          onChange={(e) => setDateEnd(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <label className="mb-3">Time</label>
                  <Row xs={4} className="gy-3">
                    <Col>
                      {addClock ? (
                        <div
                          style={{ position: "relative" }}
                          className="d-flex justify-content-center"
                        >
                          <input
                            type="time"
                            className={styles.clockInput}
                            onChange={(e) => setClock(e.target.value)}
                          />
                          <div
                            className={`d-flex ${styles.addClockActionBtnGroup}`}
                          >
                            <XCircleIcon
                              className={`text-danger ${styles.addClockActionBtn}`}
                              onClick={() => setAddClock(false)}
                            />
                            <CheckCircleIcon
                              className={`text-success ${styles.addClockActionBtn}`}
                              onClick={handleSetClockList}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={styles.addClock}
                          onClick={() => setAddClock(true)}
                        >
                          <PlusIcon onClick={() => setAddClock(true)} />
                        </div>
                      )}
                    </Col>
                    {update
                      ? scheduleClock.map((item, index) => (
                          <Col
                            key={index}
                            className={`d-flex align-items-center justify-content-center ${styles.clock}`}
                          >
                            {moment(`2021-12-12 ${item}`)
                              .format("LT")
                              .toLowerCase()}
                            <div className={styles.delete}>
                              <XIcon />
                            </div>
                          </Col>
                        ))
                      : clockList.sort().map((item, index) => (
                          <Col
                            key={index}
                            className={`d-flex align-items-center justify-content-center ${styles.clock}`}
                          >
                            {moment(`2021-12-12 ${item}`)
                              .format("LT")
                              .toLowerCase()}
                            <div
                              className={styles.delete}
                              onClick={() => removeClockListItem(item)}
                            >
                              <XIcon />
                            </div>
                          </Col>
                        ))}
                  </Row>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={`d-flex justify-content-end p-0 mt-5 ${styles.actionButton}`}
                >
                  <Button
                    variant="outline-primary"
                    type="reset"
                    className={`me-4 ${styles.resetButton}`}
                  >
                    {update ? "Cancel" : "Reset"}
                  </Button>
                  <Button variant="primary" type="submit">
                    {update ? "Update" : "Submit"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </form>
          <Col className={`${styles.movieData}`}>
            <DataSchedule
              sort={sort}
              location={location}
              handleSort={setSort}
              movieData={movieData}
              movieName={movieName}
              handleUpdate={setForm}
              showModal={setShowModal}
              handleMovie={setMovieNameFilter}
              handleLocation={setLocationFilter}
              locationData2={locationData2}
              handlePremiereId={setPremiereId}
              handleDelete={handleDeletePremiere}
            />
          </Col>
          <Col className={`d-flex justify-content-center ${styles.pagination}`}>
            <ReactPaginate
              previousLabel={""}
              nextLabel={""}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pagination.totalPage} // Total page
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={(e) => handlePageClick(e)}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  premiere: state.premiere,
});
const mapDispatchToProps = { getPremieres };

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
