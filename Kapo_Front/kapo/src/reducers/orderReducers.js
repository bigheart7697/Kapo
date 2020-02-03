import { FETCH_ORDERS, FETCH_ORDER, FETCH_PRODUCT_ORDERS } from "../actions/types";
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
        orders: { ...state.orders, ..._.mapKeys(action.payload, "id") }
      };
    case FETCH_PRODUCT_ORDERS:
      return {
        ...state,
        orders: { ...state.orders, ..._.mapKeys(action.payload, "id")}
      };
    // case DELETE_PRODUCT:
    //   return { ...state, products: _.omit(state.products, action.payload) };
    default:
      return state;
  }
};

export default orderReducer