import React from 'react'
import {Route, Router} from 'react-router-dom'
import history from '../../history'
import '../../style.scss'

import './index.scss'

import mainpage from '../mainpage'
import AddProduct from '../AddProduct'

const App = () => {
    return (
        <div className="app-container">
            <Router history={history}>
                <div>
                    <Route path="/" exact component={mainpage}/>
                    <Route path="/AddProduct" exact component={AddProduct}/>
                </div>
            </Router>
        </div>
    )
}

export default App