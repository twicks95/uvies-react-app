const initialState = {
  movies: [],
  pagination: {},
  upcomingMovies: [],
  isLoading: false,
  isError: false,
  movieData: {},
  msg: "",
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_MOVIES_FULFILLED":
      return {
        ...state,
        movies: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_MOVIES_REJECTED":
      return {
        ...state,
        movies: [],
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "GET_UPCOMING_MOVIES_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_UPCOMING_MOVIES_FULFILLED":
      return {
        ...state,
        upcomingMovies: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "GET_UPCOMING_MOVIES_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "CREATE_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "CREATE_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "CREATE_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "CREATE_MOVIE_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "CREATE_MOVIE_IMAGE_FULFILLED":
      return {
        ...state,
        movieData: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "CREATE_MOVIE_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_MOVIE_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_MOVIE_IMAGE_FULFILLED":
      return {
        ...state,
        movieData: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_MOVIE_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        // msg: action
      };
    case "DELETE_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_MOVIE_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_MOVIE_IMAGE_FULFILLED":
      return {
        ...state,
        movieData: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.data.msg,
      };
    case "DELETE_MOVIE_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default movie;
