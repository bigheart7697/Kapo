import React from 'react'
import {Route, Router} from 'react-router-dom'
import history from '../../history'
import '../../style.scss'

import './index.scss'

import productDetails from '../product-details'
import AddProduct from '../AddProduct'
import Navbar from '../navbar'
import SignIn from '../Auth/signIn'
import SignUp from '../Auth/signUp'
import MainPage from '../mainpage'
import ProductList from '../productList'
<<<<<<< HEAD
import MyProductList from '../myProductList'
=======
import Bank from '../bank'
import PreviewOrder from '../previewOrder'
import OrderList from '../orderList'
>>>>>>> front-end

const App = () => {
    return (
        <div className="app-container">
            <Router history={history}>
                <div>
                    <Navbar></Navbar>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/ProductList" exact component={ProductList} />
                    <Route path="/product/:id" exact component={productDetails}/>
                    <Route path="/AddProduct" exact component={AddProduct}/>
                    <Route path="/Auth/SignIn" exact component={SignIn}/>
                    <Route path="/Auth/SignUp" exact component={SignUp}/>
                    <Route path="/MyProductList" exact component={MyProductList} />
                    <Route path="/order/preview/:id" exact component={PreviewOrder}/>
                    <Route path="/bank" exact component={Bank}/>
                    <Route path="/order/list" exact component={OrderList}/>
                </div>
            </Router>
        </div>
    )
}

export default App