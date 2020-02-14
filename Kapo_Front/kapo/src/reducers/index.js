import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import productReducer from './productReducer'
import orderReducers from './orderReducers'
import userReducer from './userReducer'
import advertisementReducer  from './advertisementReducer'

export default combineReducers({
    form: formReducer,
    products: productReducer,
    orders: orderReducers,
    advertisements: advertisementReducer,
    user: userReducer
})
