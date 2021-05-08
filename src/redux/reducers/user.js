const initialState = {
  data: {},
  isloading: false,
  isGetError: false,
  isUpdateDataError: false,
  isUpdatePasswordError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_DATA_PENDING":
      return {
        ...state,
        isLoading: true,
        isGetError: false,
      };
    case "GET_USER_DATA_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data[0],
        isGetError: false,
        msg: action.payload.data.msg,
      };
    case "GET_USER_DATA_REJECTED":
      return {
        ...state,
        data: {},
        isGetError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_DATA_PENDING":
      return {
        ...state,
        isLoading: true,
        isUpdateDataError: false,
      };
    case "UPDATE_USER_DATA_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isUpdateDataError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_DATA_REJECTED":
      return {
        ...state,
        isLoading: false,
        isUpdateDataError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_PASSWORD_PENDING":
      return {
        ...state,
        isLoading: true,
        isUpdatePasswordError: false,
      };
    case "UPDATE_USER_PASSWORD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isUpdatePasswordError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_PASSWORD_REJECTED":
      return {
        ...state,
        isLoading: false,
        isUpdatePasswordError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
