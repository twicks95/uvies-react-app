const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
  pagination: {},
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_MOVIE_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
      };
    case "GET_MOVIE_REJECTED":
      return {
        ...state,
        data: [],
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    default:
      return state;
  }
};

export default movie;
