import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import productReducer from './productReducer'
import orderReducers from './orderReducers'

export default combineReducers({
    form: formReducer,
    products: productReducer,
    orders: orderReducers
})
