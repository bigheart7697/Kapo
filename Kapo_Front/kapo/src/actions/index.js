import server from "../apis/server";
import setAuthToken from '../components/basic/setAuthToken'

import { FETCH_PRODUCTS, FETCH_MY_PRODUCTS, ADD_PRODUCT, SEARCH_ITEM, FETCH_PRODUCT, FETCH_ORDERS, FETCH_ORDER } from "./types";

export const fetchProducts = () => async dispatch => {
  const response = await server.get("/");
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchMyProducts = () => async dispatch => {
  const response = await server.get("/products/");
  dispatch({ type: FETCH_MY_PRODUCTS, payload: response.data });
};

export const fetchMyOrders = () => async dispatch => {
  const response = await server.get("/orders/");
  dispatch({ type: FETCH_ORDERS, payload: response.data });
};

export const fetchOrder = id => async dispatch => {
  console.log("id")
  console.log(id)
  const response = await server.get(`/orders/${id}`)
  console.log(response)
  dispatch({ type: FETCH_ORDER, payload: response.data })
}

export const addProduct = product => async dispatch => {
  try {
    console.log(product)
	const response = await server.post("/add-product/", product);
	console.log(response)
    alert("کالا اضافه شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};

export const fetchProduct = id => async dispatch => {
  console.log("id")
  console.log(id)
  const response = await server.get(`/products/${id}`)
  console.log(response)
  dispatch({ type: FETCH_PRODUCT, payload: response.data })
}

export const searchProducts = search => async dispatch => {
  console.log(search)
  let response
  if(search !== ""){
    response = await server.get(`/search?search=${search}`);
  }else{
    response = await server.get(`/`)
  }
  console.log(response)
  dispatch({ type: SEARCH_ITEM, payload: response.data });
};

export const addToCart = (id, count) => async dispatch => {
  let payload = {count : parseInt(count)}
  console.log(payload)
  try {
    const response = await server.post(`/product/${id}/order`, payload);
    console.log(response);
    alert("سفارش شما ثبت شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};

export const SignIn = (auth) => async dispatch => {
  try{
    console.log(auth)
    const response = await server.post('/token-auth/', auth)
    localStorage.setItem("jwtToken", response.data.token)
    setAuthToken(response.data.token)
    console.log(response.data.token)
  } catch{
    alert("error")
  }
}

export const SignOut = () => async dispatch => {
  setAuthToken()
  delete localStorage.jwtToken
}

export const SignUp = (formValues) => async dispatch => {
  const response = await server.post("/accounts/register/", formValues)
  localStorage.setItem("jwtToken", response.data.token)
  setAuthToken(response.data.token)
  console.log(response)
}