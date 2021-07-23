import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import movie from "./movie";
import premiere from "./premiere";
import booking from "./booking";

export default combineReducers({
  auth,
  user,
  movie,
  premiere,
  booking,
});
