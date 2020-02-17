import {  FETCH_CATEGORY_HIERARCHY, FETCH_PRODUCTS, ADD_PRODUCT, SEARCH_ITEM, FETCH_PRODUCT, FETCH_SIMILAR_PRODUCTS, FETCH_PRODUCT_CATEGORIES } from "../actions/types";
import _ from "lodash";
import {catDict} from "../components/basic/categoryDict"

const INITIAL_VALUE = {
  products: {},
  categories:{}
};

const productReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORIES:
      return{
        ...state,
        ...action.payload
      }
      case FETCH_CATEGORY_HIERARCHY:
        return{
          ...state,
          category_hierarchy: catDict(action.payload)
        }
    case SEARCH_ITEM:
      return {
        ...state,
        sponsored_products: { ..._.mapKeys(action.payload, "id") }
      };
    case ADD_PRODUCT:
    case FETCH_PRODUCT:
      return {
        ...state,
        products: { ...state.products, [action.payload.id]: action.payload }
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: { ..._.mapKeys(action.payload, "id") }
      };
      case FETCH_SIMILAR_PRODUCTS:
        return {
          ...state,
          similar_products: {..._.mapKeys(action.payload, "id") }
        };
    default:
      return state;
  }
};

export default productReducer;
