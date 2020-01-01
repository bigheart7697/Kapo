import { FETCH_PRODUCTS, ADD_PRODUCT, SEARCH_ITEM } from "../actions/types";
import _ from "lodash";

const INITIAL_VALUE = {
  products: {}
};

const productReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case SEARCH_ITEM:
      return {
        ...state,
        products: { ..._.mapKeys(action.payload, "id") }
      };
    // case DELETE_PRODUCT:
    //   return { ...state, products: _.omit(state.products, action.payload) };
    case ADD_PRODUCT:
      // case FETCH_PRODUCT:
      // case EDIT_PRODUCT:
      return {
        ...state,
        products: { ...state.products, [action.payload.id]: action.payload }
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: { ...state.products, ..._.mapKeys(action.payload, "id") }
      };
    default:
      return state;
  }
};

export default productReducer;
