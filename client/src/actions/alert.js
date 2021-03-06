import { SET_ALERT } from "./types.js";
import uuid from "uuid/v4";

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid;
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
