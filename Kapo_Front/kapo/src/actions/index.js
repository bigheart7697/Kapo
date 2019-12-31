import server from "../apis/server";

import { FETCH_PRODUCTS, ADD_PRODUCT, SEARCH_ITEM } from "./types";

export const fetchProducts = () => async dispatch => {
  const response = await server.get("/products");
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const searchProducts = search => async dispatch => {
  const response = await server.get(`/products/?title=${search}`);
  dispatch({ type: SEARCH_ITEM, payload: response.data });
};
