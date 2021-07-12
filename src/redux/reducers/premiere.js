const initialState = {
  premieres: { data: [], pagination: { totalPage: 1 } },
  locations: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const premiere = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PREMIERES_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_PREMIERES_FULFILLED":
      return {
        ...state,
        premieres: {
          ...state.premieres,
          data: action.payload.data.data,
          pagination: action.payload.data.pagination,
        },
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "GET_PREMIERES_REJECTED":
      return {
        ...state,
        premieres: [],
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "GET_PREMIERES_LOCATION_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_PREMIERES_LOCATION_FULFILLED":
      return {
        ...state,
        locations: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "GET_PREMIERES_LOCATION_REJECTED":
      return {
        ...state,
        locations: [],
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default premiere;
