import axiosApiInstances from "../../utils/axios";

export const getPremieres = (
  movieId,
  premiereId,
  location,
  movie,
  order,
  page,
  limit
) => {
  return {
    type: "GET_PREMIERES",
    payload: axiosApiInstances.get(
      `premiere/2?movieId=${movieId}&premiereId=${premiereId}&location=${location}&movie=${movie}&order=${order}&page=${page}&limit=${limit}`
    ),
  };
};

export const getPremieresLocation = () => {
  return {
    type: "GET_PREMIERES_LOCATION",
    payload: axiosApiInstances.get("premiere/location"),
  };
};
