import React from 'react'
import {Route, Router} from 'react-router-dom'
import history from '../../history'
import '../../style.scss'

import './index.scss'

import mainpage from '../mainpage'
import AddProduct from '../AddProduct'
import Navbar from '../navbar'
import productList from '../product-list'
import SignIn from '../Auth/signIn'
import SignUp from '../Auth/signUp'

const App = () => {
    return (
        <div className="app-container">
            <Router history={history}>
                <div>
                    <Navbar></Navbar>
                    <Route path="/" exact component={productList}/>
                    <Route path="/product/:id" exact component={mainpage}/>
                    <Route path="/AddProduct" exact component={AddProduct}/>
                    <Route path="/Auth/SignIn" exact component={SignIn}/>
                    <Route path="/Auth/SignUp" exact component={SignUp}/>
                </div>
            </Router>
        </div>
    )
}

export default App