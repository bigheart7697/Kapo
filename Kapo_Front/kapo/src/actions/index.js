import server from "../apis/server";
import setAuthToken from '../components/basic/setAuthToken'
import history from '../history'

import { FETCH_PRODUCT_CAMPAIGN, FETCH_FIRST_CAMPAIGN, FETCH_SECOND_CAMPAIGN, FETCH_THIRD_CAMPAIGN, CAMPAIGN_COUNT, FETCH_SPONSORS, FETCH_CAMPAIGNS, FETCH_BANNERS, FETCH_FACTOR, FETCH_TRANSACTIONS, FETCH_USERS ,BANNER_COUNT, FETCH_SECOND_BANNER, FETCH_THIRD_BANNER, FETCH_FIRST_BANNER, FETCH_CATEGORY_HIERARCHY, FETCH_PRODUCTS, SEARCH_ITEM, FETCH_PRODUCT, FETCH_ORDERS, FETCH_ORDER, FETCH_PRODUCT_CATEGORIES, LOG_IN, LOG_OUT, FETCH_USER_INFO, FETCH_SIMILAR_PRODUCTS } from "./types";

export const fetchProducts = (showModal = alert) => async dispatch => {
  try{
    const response = await server.get("/kapo/");
    dispatch({ type: FETCH_PRODUCTS, payload: response.data });
  }catch(e){
  }
};

export const fetchMyProducts = () => async dispatch => {
  const response = await server.get("/kapo/products/");
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchCategories = () => async dispatch => {
  const response = await server.get("/kapo/prod-cats/");
  dispatch({ type: FETCH_PRODUCT_CATEGORIES, payload: response.data })
}

export const fetchCategoryHierarchy = () => async dispatch => {
  const response = await server.get("/kapo/cat-hierarchy/");
  dispatch({type: FETCH_CATEGORY_HIERARCHY, payload: response.data})
}

export const fetchMyOrders = () => async dispatch => {
  const response = await server.get("/kapo/orders/");
  dispatch({ type: FETCH_ORDERS, payload: response.data });
};

export const fetchOrder = id => async dispatch => {
  const response = await server.get(`/kapo/orders/${id}/`)
  dispatch({ type: FETCH_ORDER, payload: response.data })
}

export const fetchProductOrders = id => async dispatch => {
  const response = await server.get(`/kapo/products/${id}/orders/`);
  dispatch({type: FETCH_ORDERS, payload: response.data})
}

export const completeOrder = id => async dispatch => {
  try {
    await server.post(`/kapo/orders/${id}/complete/`);
    history.push("/payment/result/success")
  } catch (e) {
    alert("?????????? ???? ??????");
  }
};

export const cancelOrder = id => async dispatch => {
  try {
	await server.post(`/kapo/orders/${id}/cancel/`);
  history.push("/payment/result/fail")
  } catch (e) {
    alert("?????????? ???? ??????");
  }
};

export const completeBanner = id => async dispatch => {
  try {
    await server.post(`/kapo/banners/${id}/complete/`);
    history.push("/payment/result/success")
  } catch (e) {
    alert("?????????? ???? ??????");
  }
}

export const failBanner = id => async dispatch => {
  try {
    await server.post(`/kapo/banners/${id}/fail/`);
    history.push("/payment/result/fail")
  }
  catch (e) {
    alert("?????????? ???? ??????");
  }
}

export const completeCampaign = id => async dispatch => {
  try {
    await server.post(`/kapo/campaigns/${id}/complete/`);
    history.push("/payment/result/success")
  } catch (e) {
    alert("?????????? ???? ??????");
  }
}

export const failCampaign = id => async dispatch => {
  try {
    await server.post(`/kapo/campaigns/${id}/fail/`);
    history.push("/payment/result/fail")
  }
  catch (e) {
    alert("?????????? ???? ??????");
  }
}


export const completeSponsor = id => async dispatch => {
  try {
    await server.post(`/kapo/sponsors/${id}/complete/`);
    history.push("/payment/result/success")
  } catch (e) {
    alert("?????????? ???? ??????");
  }
}

export const failSponsor = id => async dispatch => {
  try {
    await server.post(`/kapo/sponsors/${id}/fail/`);
    history.push("/payment/result/fail")
  }
  catch (e) {
    alert("?????????? ???? ??????");
  }
}

export const completeCharge = id => async dispatch => {
  try {
    await server.post(`/accounts/balance/${id}/complete/`);
    history.push("/payment/result/success")
  } catch (e) {
    alert("?????????? ???? ??????");
  }
}

export const failCharge = id => async dispatch => {
  try {
    await server.post(`/accounts/balance/${id}/fail/`);
    history.push("/payment/result/fail")
  }
  catch (e) {
    alert("?????????? ???? ??????");
  }
}

export const bannerCount = place_id => async dispatch => {
  const response = await server.get(`/kapo/banner-count/${place_id}/`);
  dispatch({type: BANNER_COUNT, payload: {count: response.data.count, place: place_id}})
}

export const addProduct = product => async dispatch => {
  try {
    await server.post("/kapo/add-product/", product);
    alert("???????? ?????????? ????");
  } catch (e) {
    alert("?????????? ???? ??????");
  }
};

export const setPrice = (category = null) => async dispatch => {
  let response
  if (category != null) {
    response = await server.get(`/kapo/search/?cat3=${category}`);
  } else {
    response = {}
  }
  dispatch({ type: FETCH_SIMILAR_PRODUCTS, payload: response.data });
}

export const fetchProduct = (id, showModal = alert) => async dispatch => {
  try{
    const response = await server.get(`/kapo/products/${id}/`)
    dispatch({ type: FETCH_PRODUCT, payload: response.data })
  }catch(e){
    // showModal('????????', '?????????? ???? ?????????????? ???????? ???? ???????? ???? ???????? ??????', e.message)
  }
}

export const searchProducts = (search, category = null, params = null) => async dispatch => {
  let response
  if (search !== "") {
    response = await server.get(`/kapo/search/${search ? `?search=${search}` : ''}`, {params});
  } else {
    response = await server.get(`/kapo/`)
  }
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const sponsoredSearchProducts = (search) => async dispatch => {
  let response
  if (search !== "") {
    response = await server.get(`/kapo/sponsored-search/?search=${search}`);
  } else {
    response  = {data: {}}
  }
  dispatch({ type: SEARCH_ITEM, payload: response.data });
};

export const categoryProducts = (category1 = null, category2 = null, category3 = null) => async dispatch => {
  let response
  if (category1 != null) {
    if (category2 != null) {
      if (category3 != null) {
        response = await server.get(`/kapo/search/?cat1=${category1}&cat2=${category2}&cat3=${category3}`)
      }
      else {
        response = await server.get(`/kapo/search/?cat1=${category1}&cat2=${category2}`)
      }
    }
    else {
      response = await server.get(`/kapo/search/?cat1=${category1}`)
    }
  }
  else {
    response = await server.get(`/kapo/`)
  }
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchFirstBanners = () => async dispatch => {
  const response = await server.get(`/kapo/first-banners/`)
  dispatch({ type: FETCH_FIRST_BANNER, payload: response.data });
};

export const fetchSecondBanners = () => async dispatch => {
  const response = await server.get(`/kapo/second-banners/`)
  dispatch({ type: FETCH_SECOND_BANNER, payload: response.data });
};

export const fetchThirdBanners = () => async dispatch => {
  const response = await server.get(`/kapo/third-banners/`)
  dispatch({ type: FETCH_THIRD_BANNER, payload: response.data });
};

export const addToCart = (id, formValues) => async dispatch => {
  try {
    const response = await server.post(`/kapo/products/${id}/order/`, formValues);
    history.push(`/order/preview/${response.data.id}/`)
    alert("?????????? ?????? ?????? ????");
  } catch (e) {
    alert("?????????? ???? ??????");
  }
};

export const SignIn = (auth, showModal) => async dispatch => {
  try {
    setAuthToken()
    const response = await server.post('/token-auth/', auth)
    localStorage.setItem("jwtToken", response.data.token)
    localStorage.setItem("user_email", response.data.user.email)
    setAuthToken(response.data.token)
    history.push('/')
    dispatch({ type: LOG_IN })
    dispatch(getCurrentUser())
  } catch(e) {
    showModal('??????', '???????????? ???????? ???? ?????? ?????????? ????', e.message)
  }
}

export const SignOut = () => async dispatch => {
  setAuthToken()
  delete localStorage.jwtToken
  delete localStorage.user_email
  dispatch({ type: LOG_OUT })
}

export const SignUp = (formValues, showModal) => async dispatch => {
  try {
    setAuthToken()
    const response = await server.post("/accounts/register/", formValues)
    localStorage.setItem("jwtToken", response.data.token)
    setAuthToken(response.data.token)
    showModal("???????????????", "??????????????? ???? ???????????? ?????????? ????")
  } catch {
    showModal("???????????????", "??????????????? ???? ?????? ?????????? ????")
  }
}

export const ChangeProductAction = (formValues, id) => async dispatch => {
  try {
    await server.put(`/kapo/products/${id}/`, formValues)
    alert("???????????? ???????? ???? ???????????? ?????????? ????")
  }
  catch{
    alert("error")
  }
}

export const deleteProduct = (id) => async dispatch => {
  if (id != null){
    try {
      await server.delete(`/kapo/products/${id}/`);
      alert("???????? ???? ???????????? ?????? ????.");
      history.push(`/`);
    } catch {
      alert("error")
    }
  }
}

export const setIsLoggedInStatus = () => {
  return {
    type: LOG_IN
  }
}

export const createSponsoredSearch = (formValues, id) => async dispatch => {
  try {
    const response = await server.post(`/kapo/products/${id}/sponsor/`, formValues)
    history.push(`/pay/factor/${response.data.transaction}`);
    alert("?????????????? ?????????????? ???????? ???? ???????????? ?????????? ????")
  }
  catch {
    alert("error")
  }
}

export const createAdvertisingBanners = (formValues, id) => async dispatch => {
  try {
    const response = await server.post(`/kapo/products/${id}/banner/`, formValues)
    history.push(`/pay/factor/${response.data.transaction}`);
    alert("?????????????? ?????? ?????? ???? ???????????? ?????????? ????")
  }
  catch {
    alert("error")
  }
};
export const createAdvertisingCampaigns = (formValues, id) =>  async dispatch => {
  try {
    const response = await server.post(`/kapo/products/${id}/campaign/`, formValues)
    history.push(`/pay/factor/${response.data.transaction}`);
    alert("?????????????? ?????? ?????????? ???? ???????????? ?????????? ????")
  }
  catch {
    alert("error")
  }
};
  
export const getCurrentUser = () => async dispatch => {
  try{
    const response = await server.get('accounts/current-user/')
    dispatch({ type: FETCH_USER_INFO, payload: response.data })
  }catch{

  }
}

export const editProfile = (data, id) => async dispatch => {
  try{
    await server.patch(`accounts/${id}/`, data)
    alert('success')
  }catch{
    alert('error')
  }
}


export const getAllUsers = () => async dispatch => {
  const response = await server.get("/admin_statistics/user_statistics/");
  dispatch({ type: FETCH_USERS, payload: response.data });
}

export const rateProduct = (rate, id, showModal = alert) => async () => {
  try{
    await server.post(`/kapo/products/${id}/rate`, {rating: rate})
    showModal('????????', '?????? ?????? ???? ???????????? ?????? ????')
  }catch(e){
    showModal('??????', '???? ?????? ?????? ?????? ?????????? ?????? ??????', e.message)
  }
}
export const getAllTransactions = () => async dispatch => {
  const response = await server.get("/admin_statistics/transaction_statistics/");
  dispatch({ type: FETCH_TRANSACTIONS, payload: response.data });
}

export const fetch_factor = (id) => async dispatch => {
  const response = await server.get(`kapo/transaction/${id}/`);
  dispatch({type: FETCH_FACTOR, payload:response.data})
}

export const fetchMyBanners = () => async dispatch => {
  const response = await server.get(`kapo/my-banners/`);
  dispatch({type: FETCH_BANNERS, payload:response.data})
}

export const fetchAllBanners = () => async dispatch => {
  const response = await server.get("/admin_statistics/all_banners/");
  dispatch({ type: FETCH_BANNERS, payload: response.data });
}

export const fetchMyCampaigns = () => async dispatch => {
  const response = await server.get(`kapo/my-campaigns/`);
  dispatch({type: FETCH_CAMPAIGNS, payload:response.data})
}

export const fetchAllCampaigns = () => async dispatch => {
  const response = await server.get("/admin_statistics/all_campaigns/");
  dispatch({ type: FETCH_CAMPAIGNS, payload: response.data });
}

export const fetchMySponsors = () => async dispatch => {
  const response = await server.get(`kapo/my-sponsors/`);
  dispatch({type: FETCH_SPONSORS, payload:response.data})
}

export const fetchAllSponsors = () => async dispatch => {
  const response = await server.get("/admin_statistics/all_sponsored_searches/");
  dispatch({ type: FETCH_SPONSORS, payload: response.data });
}

export const chargeAccount = (formValues) => async dispatch => {
  try {
    const response = await server.post(`/accounts/increase-balance/`, formValues);
    history.push(`/pay/factor/${response.data.transaction}`);
  }
  catch {
    alert("?????????????? ???????? ???????? ???? ???????? ?????????? ????.")
  }
}

export const fetchProductCampaign = (id) => async dispatch => {
  const response = await server.get(`kapo/products/${id}/campaigns/`);
  dispatch({ type: FETCH_PRODUCT_CAMPAIGN, payload: response.data });
}

export const fetchFirsCampaign = () => async dispatch => {
  const response = await server.get(`/kapo/first-campaigns/`)
  dispatch({ type: FETCH_FIRST_CAMPAIGN, payload: response.data });
};

export const fetchSecondCampaign = () => async dispatch => {
  const response = await server.get(`/kapo/second-campaigns/`)
  dispatch({ type: FETCH_SECOND_CAMPAIGN, payload: response.data });
};

export const fetchThirdCampaign = () => async dispatch => {
  const response = await server.get(`/kapo/third-campaigns/`)
  dispatch({ type: FETCH_THIRD_CAMPAIGN, payload: response.data });
};

export const campaignCount = (place_id) => async dispatch => {
  const response = await server.get(`/kapo/campaign-count/${place_id}/`);
  dispatch({type: CAMPAIGN_COUNT, payload: {count: response.data.count, place: place_id}})
}