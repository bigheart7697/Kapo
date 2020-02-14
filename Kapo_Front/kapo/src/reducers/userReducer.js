import { FETCH_USERS, LOG_IN, LOG_OUT, FETCH_USER_INFO } from "../actions/types";
import _ from "lodash";

const INFO_OBJECT = {"id": null,"email": null,"country": null,"city": null,"address": null,"phone_number": null,"photo": null,"is_corporate": null,"first_name": null,"last_name": null,"corporate_name":null,"corporate_number":null}

const INITIAL_VALUE = {
  isLoggedIn : false,
  information : INFO_OBJECT,
  all_accounts: {}
};

const orderReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case FETCH_USER_INFO:
      return {...state, information: action.payload}
    case LOG_IN:
        return {...state, isLoggedIn: true}
    case LOG_OUT:
        return {...state, isLoggedIn: false, userId: null, userEmail: null}
      case FETCH_USERS:
        return {...state, all_accounts: { ..._.mapKeys(action.payload, "id") }}
    default:
      return state;
  }
};

export default orderReducer