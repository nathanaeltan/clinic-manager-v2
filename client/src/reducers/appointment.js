import { GET_ALL_APPTS } from "../actions/types";

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
    default:
      return state;
  }
}
