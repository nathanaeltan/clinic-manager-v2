import { GET_ALL_PATIENTS, GET_ALL_PATIENTS_FAIL } from "../actions/types";
import axios from "axios";
import { setAlert } from "./alert";

export const getPatients = () => async dispatch => {
  try {
    const res = await axios.get("/api/patients");

    dispatch({
      type: GET_ALL_PATIENTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "danger"));
      });
      dispatch({
        type: GET_ALL_PATIENTS_FAIL
      });
    }
  }
};
