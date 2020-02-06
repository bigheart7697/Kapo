import server from "../apis/server";
import setAuthToken from '../components/basic/setAuthToken'
import history from '../history'

import { FETCH_PRODUCTS, FETCH_MY_PRODUCTS, ADD_PRODUCT, SEARCH_ITEM, FETCH_PRODUCT, FETCH_ORDERS, FETCH_ORDER, FETCH_PRODUCT_CATEGORIES, FETCH_PRODUCT_ORDERS } from "./types";

export const fetchProducts = () => async dispatch => {
  const response = await server.get("/kapo/");
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchMyProducts = () => async dispatch => {
  const response = await server.get("/kapo/products/");
  dispatch({ type: FETCH_MY_PRODUCTS, payload: response.data });
};

export const fetchCategories = () => async dispatch => {
  const response = await server.get("/kapo/prod-cats/");
  dispatch({ type: FETCH_PRODUCT_CATEGORIES, payload: response.data })
}

export const fetchMyOrders = () => async dispatch => {
  const response = await server.get("/kapo/orders/");
  dispatch({ type: FETCH_ORDERS, payload: response.data });
};

export const fetchOrder = id => async dispatch => {
  console.log("id")
  console.log(id)
  const response = await server.get(`/kapo/orders/${id}`)
  console.log(response)
  dispatch({ type: FETCH_ORDER, payload: response.data })
}

export const fetchProductOrders = id => async dispatch => {
  console.log("id")
  console.log(id)
  const response = await server.get(`/kapo/products/${id}/orders`);
  console.log(response)
  dispatch({type: FETCH_PRODUCT_ORDERS, payload: response.data})
}

export const completeOrder = id => async dispatch => {
  try {
    console.log("$id")
	const response = await server.post(`/kapo/orders/${id}/complete/`);
	console.log(response)
    alert("سفارش پرداخت شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};

export const cancelOrder = id => async dispatch => {
  try {
	const response = await server.post(`/kapo/orders/${id}/cancel/`);
	console.log(response)
    alert("سفارش لغو شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};

export const addProduct = product => async dispatch => {
  try {
    console.log(product)
    const response = await server.post("/kapo/add-product/", product);
    console.log(response)
    alert("کالا اضافه شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};

export const setPrice = (category = null) => async dispatch => {
  let response
  if (category != null) {
    response = await server.get(`/kapo/search/?cat3=${category}`);
  } else {
    response = await server.get(`/kapo/`);
  }
  dispatch({ type: SEARCH_ITEM, payload: response.data });
}

export const fetchProduct = id => async dispatch => {
  console.log("id")
  console.log(id)
  const response = await server.get(`/kapo/products/${id}`)
  console.log(response)
  dispatch({ type: FETCH_PRODUCT, payload: response.data })
}

export const searchProducts = (search, category = null) => async dispatch => {
  console.log(search)
  let response
  if (search !== "") {
    response = await server.get(`/kapo/search/?search=${search}`);
  } else {
    response = await server.get(`/kapo/`)
  }
  console.log(response)
  dispatch({ type: SEARCH_ITEM, payload: response.data });
};

export const addToCart = (id, count) => async dispatch => {
  let payload = { count: parseInt(count) }
  console.log(payload)
  try {
    const response = await server.post(`/kapo/products/${id}/order/`, payload);
    console.log(response);
    alert("سفارش شما ثبت شد");
  } catch (e) {
    alert("خطایی رخ داد");
  }
};

export const SignIn = (auth) => async dispatch => {
  try {
    console.log(auth)
    setAuthToken()
    const response = await server.post('/token-auth/', auth)
    localStorage.setItem("jwtToken", response.data.token)
    setAuthToken(response.data.token)
    console.log(response.data.token)
    alert("ورود با موفقیت انجام شد")
    history.push('/')
  } catch{
    alert("error")
  }
}

export const SignOut = () => async dispatch => {
  setAuthToken()
  delete localStorage.jwtToken
}

export const SignUp = (formValues) => async dispatch => {
  try {
    setAuthToken()
    const response = await server.post("/accounts/register/", formValues)
    localStorage.setItem("jwtToken", response.data.token)
    setAuthToken(response.data.token)
    console.log(response)
    alert("ثبت‌نام با موفقیت انجام شد")
  } catch{
    alert("error")
  }
}

export const ChangeProductAction = (id, formValues) => async dispatch => {
  try {
    const response = await server.post(`/kapo/products/${id}/`, formValues)
    alert("ویرایش کالا با موفقیت انجام شد")
  }
  catch{
    alert("error")
  }
}