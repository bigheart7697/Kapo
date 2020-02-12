import { LOG_IN, LOG_OUT } from "../actions/types";
import _ from "lodash";

const INITIAL_VALUE = {
  isLoggedIn : false,
  userId: null,
  userEmail: null
};

const orderReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOG_IN:
        return {...state, isLoggedIn: true}
    case LOG_OUT:
        return {...state, isLoggedIn: false, userId: null, userEmail: null}
    default:
      return state;
  }
};

export default orderReducer