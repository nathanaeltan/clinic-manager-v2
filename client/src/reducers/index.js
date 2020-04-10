import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import appointment from "./appointment";
export default combineReducers({
  alert,
  auth,
  appointment
});
