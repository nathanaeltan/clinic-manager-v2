import { GET_ALL_PATIENTS, GET_ALL_PATIENTS_FAIL } from "../actions/types";

const initialState = {
  loading: true,
  patients: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PATIENTS:
      return {
        ...state,
        loading: false,
        patients: payload
      };
    case GET_ALL_PATIENTS_FAIL:
      return {
        ...state,
        loading: false,
        patients: []
      };
    default:
      return state;
  }
}
