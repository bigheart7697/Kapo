import { LOG_IN, LOG_OUT } from "../actions/types";
import _ from "lodash";

const INITIAL_VALUE = {
  isLoggedIn : false
};

const orderReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOG_IN:
        console.log('right here')
        return {...state, isLoggedIn: true}
    case LOG_OUT:
        return {...state, isLoggedIn: false}
    default:
      return state;
  }
};

export default orderReducer