import {
  GET_ALL_APPTS,
  ADD_APPT_SUCCESS,
  ADD_APPT_FAIL,
  DELETE_APPT,
  DELETE_APPT_FAIL,
  UPDATE_APPT
} from "../actions/types";

const initialState = {
  loading: true,
  appointments: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_APPTS:
      return {
        ...state,
        appointments: payload,
        loading: false
      };
    case ADD_APPT_SUCCESS:
      return {
        ...state,
        appointments: [payload, ...state.appointments],
        loading: false
      };
    case DELETE_APPT:
      return {
        ...state,
        appointments: state.appointments.filter(appt => appt._id !== payload),
        loading: false
      };
    case UPDATE_APPT:
      return {
        ...state,
        appointments: state.appointments.map(appt =>
          appt._id === payload._id ? { ...appt, date: payload.date } : appt
        ),
        loading: false
      };
    case ADD_APPT_FAIL:
    case DELETE_APPT_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
