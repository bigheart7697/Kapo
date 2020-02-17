import { FETCH_ORDERS, FETCH_ORDER } from "../actions/types";
import _ from "lodash";

const INITIAL_VALUE = {
  orders: {}
};

const orderReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case FETCH_ORDER:
      // case EDIT_PRODUCT:
      return {
        ...state,
        orders: { ...state.orders, [action.payload.id]: action.payload }
      };
    case FETCH_ORDERS:
      
      return {
        ...state,
        orders: {  ..._.mapKeys(action.payload, "id") }
      };
    default:
      return state;
  }
};

export default orderReducer