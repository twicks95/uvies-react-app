const initialState = {
  data: {},
  updatingDetail: false,
  updatingPassword: false,
  isLoading: false,
  isGetError: false,
  isUpdateDataError: false,
  isUpdateImageError: false,
  isUpdatePasswordError: false,
  updatedAt: "",
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
        isLoading: false,
        isGetError: false,
        msg: action.payload.data.msg,
      };
    case "GET_USER_DATA_REJECTED":
      return {
        ...state,
        data: {},
        isLoading: false,
        isGetError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_DATA_PENDING":
      return {
        ...state,
        updatingDetail: true,
        isUpdateDataError: false,
      };
    case "UPDATE_USER_DATA_FULFILLED":
      return {
        ...state,
        data: { ...state.data, ...action.payload.data.data },
        updatingDetail: false,
        isUpdateDataError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_DATA_REJECTED":
      return {
        ...state,
        updatingDetail: false,
        isUpdateDataError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isUpdateImageError: false,
      };
    case "UPDATE_USER_IMAGE_FULFILLED":
      return {
        ...state,
        data: {
          ...state.data,
          user_profile_picture: action.payload.data.data.user_profile_picture,
        },
        isLoading: false,
        isUpdateImageError: false,
        updatedAt: new Date(Date.now()),
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isUpdateImageError: true,
        updatedAt: new Date(Date.now()),
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_PASSWORD_PENDING":
      return {
        ...state,
        updatingPassword: true,
        isUpdatePasswordError: false,
      };
    case "UPDATE_USER_PASSWORD_FULFILLED":
      return {
        ...state,
        updatingPassword: false,
        isUpdatePasswordError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_PASSWORD_REJECTED":
      return {
        ...state,
        updatingPassword: false,
        isUpdatePasswordError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
