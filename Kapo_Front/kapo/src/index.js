import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import setAuthToken from './components/basic/setAuthToken'


import './index.scss'

import App from '../src/components/App'
import reducers from './reducers'

setAuthToken(localStorage.jwtToken)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware(reduxThunk)))

ReactDOM.render( <Provider store={store}><App/></Provider>, document.querySelector('#root') )