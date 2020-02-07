import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import productReducer from './productReducer'
import orderReducers from './orderReducers'
import userReducer from './userReducer'

export default combineReducers({
    form: formReducer,
    products: productReducer,
    orders: orderReducers,
    user: userReducer
})
