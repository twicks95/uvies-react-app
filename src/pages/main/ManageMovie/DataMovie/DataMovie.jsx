import { withRouter } from "react-router-dom";
import { Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import MovieCard from "../../../../components/MovieCard/MovieCard";
import styles from "./DataMovie.module.css";

const DataMovie = (props) => {
  const { movies } = props.movie;
  const { changeState, handleUpdate, handleDelete } = props;
  return (
    <>
      <div
        className={`d-flex flex-column flex-md-row justify-content-between mb-3 ${styles.movieDataHead}`}
      >
        <h3 className={`mb-4 mb-md-0`}>Movie Data</h3>
        <div className={`d-flex align-items-center ${styles.searchAction}`}>
          <DropdownButton
            variant="outline-secondary"
            title="sort"
            id="sort"
            className={`me-3`}
          >
            <Dropdown.Item
              name="sort"
              id="movie_id ASC"
              onClick={(e) => changeState(e)}
            >
              Show All
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex justify-content-between"
              name="sort"
              id="movie_name ASC"
              onClick={(e) => changeState(e)}
            >
              By Name<b>a-z</b>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex justify-content-between"
              name="sort"
              id="movie_release_date DESC"
              onClick={(e) => changeState(e)}
            >
              By Release Date<b>newest-oldest</b>
            </Dropdown.Item>
            <Dropdown.Item
              name="sort"
              id="movie_created_at DESC"
              onClick={(e) => changeState(e)}
            >
              By Currently Added
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item disabled>Uvies App</Dropdown.Item>
          </DropdownButton>
          <Form.Control
            type="text"
            name="keyword"
            placeholder="Search movie name ... "
            onChange={(e) => changeState(e)}
          />
        </div>
      </div>
      <Row xs={2} md={3} lg={4} className={`${styles.wrapper} m-0 border`}>
        {movies.map((item, index) => {
          return (
            <Col className={`d-flex justify-content-center py-3`} key={index}>
              <MovieCard
                data={item}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                isAdminManageMovie={true}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, null)(withRouter(DataMovie));
