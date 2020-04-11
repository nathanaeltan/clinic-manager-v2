import {
  GET_ALL_APPTS,
  ADD_APPT_SUCCESS,
  ADD_APPT_FAIL,
  DELETE_APPT,
  DELETE_APPT_FAIL,
  UPDATE_APPT
} from "./types";
import axios from "axios";

export const getAllAppts = () => async dispatch => {
  try {
    const res = await axios.get("/api/appointments");
    dispatch({
      type: GET_ALL_APPTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const addAppt = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/appointments", formData, config);
    dispatch({
      type: ADD_APPT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADD_APPT_FAIL
    });
  }
};

export const deleteAppt = apptID => async dispatch => {
  try {
    await axios.delete(`/api/appointments/${apptID}`);
    dispatch({
      type: DELETE_APPT,
      payload: apptID
    });
  } catch (err) {
    dispatch({
      type: DELETE_APPT_FAIL
    });
  }
};

export const updateAppt = (apptId, date) => async dispatch => {
  try {
    const data = { date: date };
    const res = await axios.put(`/api/appointments/${apptId}`, data);
    dispatch({
      type: UPDATE_APPT,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
  }
};
