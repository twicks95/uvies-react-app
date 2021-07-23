const initialState = {
  detail: {},
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case "BOOK":
      return {
        ...state,
        detail: { ...state.detail, ...action.data },
      };
    case "RESET_BOOKING":
      return {
        ...state,
        detail: {},
      };
    default:
      return state;
  }
};

export default booking;
