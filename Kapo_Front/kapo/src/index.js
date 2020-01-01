import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'


import './index.scss'

import App from '../src/components/App'
import reducers from './reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware(reduxThunk)))

ReactDOM.render( <Provider store={store}><App/></Provider>, document.querySelector('#root') )


async function getCsrfToken() {
    if (_csrfToken === null) {
      const response = await fetch(`${API_HOST}/csrf/`, {
        credentials: 'include',
      });
      const data = await response.json();
      _csrfToken = data.csrfToken;
    }
    return _csrfToken;
  }
  
  async function testRequest(method) {
    const response = await fetch(`${API_HOST}/ping/`, {
      method: method,
      headers: (
        method === 'POST'
          ? {'X-CSRFToken': await getCsrfToken()}
          : {}
      ),
      credentials: 'include',
    });
    const data = await response.json();
    return data.result;
  }