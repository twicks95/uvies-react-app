import axiosApiInstances from "../../utils/axios";

export const getUserData = (id) => {
  return {
    type: "GET_USER_DATA",
    payload: axiosApiInstances.get(`user/${id}`),
  };
};

export const updateUserData = (id, data) => {
  return {
    type: "UPDATE_USER_DATA",
    payload: axiosApiInstances.patch(`/user/data/${id}`, data),
  };
};

export const updateUserPassword = (id, data) => {
  return {
    type: "UPDATE_USER_PASSWORD",
    payload: axiosApiInstances.patch(`/user/password/${id}`, data),
  };
};
