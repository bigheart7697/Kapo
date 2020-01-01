import server from "../apis/server";

import { FETCH_PRODUCTS, ADD_PRODUCT, SEARCH_ITEM } from "./types";

export const fetchProducts = () => async dispatch => {
  const response = await server.get("/products/");
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const addProduct = product => async dispatch => {
  try {
	const response = await server.post("/products/", product);
	console.log(response)
    alert("کالا اضافه شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};

export const searchProducts = search => async dispatch => {
  let response
  if(search !== ""){
    response = await server.get(`/products/?name=${search}/`);
  }else{
    response = await server.get(`/products/`)
  }
  console.log(response)
  dispatch({ type: SEARCH_ITEM, payload: response.data });
};

export const addToCart = name => async dispatch => {
  try {
    const response = await server.post("/cart/", { name });
    console.log(response);
    alert("سفارش شما ثبت شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};
