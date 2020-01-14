import { FETCH_ORDERS } from "../actions/types";
import _ from "lodash";

const INITIAL_VALUE = {
  orders: {}
};

const orderReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: { ...state.orders, ..._.mapKeys(action.payload, "id") }
      };
    // case DELETE_PRODUCT:
    //   return { ...state, products: _.omit(state.products, action.payload) };
    default:
      return state;
  }
};

export default orderReducer