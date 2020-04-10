import { GET_ALL_APPTS } from "./types";
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
