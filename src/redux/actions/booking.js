export const setBooking = (data) => {
  return {
    type: "BOOK",
    data: data,
  };
};
export const resetBooking = () => {
  return {
    type: "RESET_BOOKING",
  };
};
