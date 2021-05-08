import axiosApiInstances from "../../utils/axios";

export const getMovies = (page, limit) => {
  return {
    type: "GET_MOVIES",
    payload: axiosApiInstances.get(`movie?page=${page}&limit=${limit}`),
  };
};

export const getMovieById = (id) => {
  return {
    type: "GET_MOVIE_BY_ID",
    payload: axiosApiInstances.get(`movie/${id}`),
  };
};

export const deleteMovie = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: axiosApiInstances.delete(`movie/${id}`),
  };
};
