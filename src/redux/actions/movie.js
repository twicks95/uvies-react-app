import axiosApiInstances from "../../utils/axios";

export const getMovies = (
  searchByName = "",
  sort = "",
  page = "1",
  limit = "8"
) => {
  return {
    type: "GET_MOVIES",
    payload: axiosApiInstances.get(
      `movie?searchByName=${searchByName}&sort=${sort}&page=${page}&limit=${limit}`
    ),
  };
};

export const getMovieById = (id) => {
  return {
    type: "GET_MOVIE_BY_ID",
    payload: axiosApiInstances.get(`movie/${id}`),
  };
};

export const getNowShowingMovies = (date, order, limit) => {
  return {
    type: "GET_NOW_SHOWING_MOVIES",
    payload: axiosApiInstances.get(
      `movie/now-showing?date=${date}&order=${order}&limit=${limit}`
    ),
  };
};

export const getUpcomingMovies = (month) => {
  return {
    type: "GET_UPCOMING_MOVIES",
    payload: axiosApiInstances.get(`movie/upcoming/${month}`),
  };
};

export const createMovie = (data) => {
  return {
    type: "CREATE_MOVIE",
    payload: axiosApiInstances.post("movie", data),
  };
};

export const createMovieImage = (data) => {
  return {
    type: "CREATE_MOVIE_IMAGE",
    payload: axiosApiInstances.post("movie/image", data),
  };
};

export const updateMovie = (id, data) => {
  return {
    type: "UPDATE_MOVIE",
    payload: axiosApiInstances.patch(`movie/${id}`, data),
  };
};

export const updateMovieImage = (id, data) => {
  return {
    type: "UPDATE_MOVIE_IMAGE",
    payload: axiosApiInstances.patch(`movie/image/${id}`, data),
  };
};

export const deleteMovie = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: axiosApiInstances.delete(`movie/${id}`),
  };
};

export const deleteMovieImage = (id) => {
  return {
    type: "DELETE_MOVIE_IMAGE",
    payload: axiosApiInstances.delete(`movie/image/${id}`),
  };
};
