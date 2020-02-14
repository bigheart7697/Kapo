import React from 'react'
import {Route, Router} from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../../history'
import { setIsLoggedInStatus, getCurrentUser } from '../../actions'

import '../../style.scss'
import './index.scss'

import productDetails from '../product-details'
import AddProduct from '../AddProduct'
import Navbar from '../navbar'
import SignIn from '../Auth/signIn'
import SignUp from '../Auth/signUp'
import MainPage from '../mainpage'
import MyProductList from '../myProductList'
import Bank from '../bank'
import PreviewOrder from '../previewOrder'
import OrderFactor from '../orderDetails/factor'
import AllProducts from '../AllProducts'
import SetPrice from '../setPrice'
import Page404 from '../basic/404'
import MyOrders from "../MyOrders"
import ProductOrders from "../ProductOrders"
import ChangeProduct from '../changeProduct'
import CategoryProducts from "../categoryProducts"
import PayFactor from '../payFactor'
import Dashboard from '../dashboard'
import PaymentResult from '../basic/paymentResult'
import AdvertisementList from '../advertisementList'
import setAuthToken from '../basic/setAuthToken'

class App extends React.Component{
    componentDidMount(){
        if(localStorage.jwtToken){
            this.props.setIsLoggedInStatus()
            this.props.getCurrentUser()
        }
    }
    render(){
        return (
            <div className="app-container">
                <Router history={history}>
                    <div>
                        <Navbar loggedIn={this.props.isLoggedIn ? true : false}></Navbar>
                        <Route path="/" exact component={MainPage}/>
                        <Route path="/ProductList" exact component={AllProducts} />
                        <Route path="/product/:id" exact component={productDetails}/>
                        <Route path="/AddProduct" exact component={AddProduct}/>
                        <Route path="/Auth/SignIn" exact component={SignIn}/>
                        <Route path="/Auth/SignUp" exact component={SignUp}/>
                        <Route path="/MyProductList" exact component={MyProductList} />
                        <Route path="/order/preview/:id" exact component={PreviewOrder}/>
                        <Route path="/bank/:id" exact component={Bank}/>
                        <Route path="/order/list" exact component={MyOrders}/>
                        <Route path="/order/factor/:id" exact component={OrderFactor}/>
                        <Route path="/AddProduct/SetPrice/:id" exact component={SetPrice}/>
                        <Route path="/404" exact component={Page404}/>
                        <Route path="/ProductOrders/:id" exact component={ProductOrders}/>
                        <Route path="/changeProduct/:id" exact component={ChangeProduct}/>
                        <Route path="/ProductList/:cat1" exact component={CategoryProducts}/>
                        <Route path="/ProductList/:cat1/:cat2" exact component={CategoryProducts}/>
                        <Route path="/ProductList/:cat1/:cat2/:cat3" exact component={CategoryProducts}/>
                        <Route path="/pay/factor" exact component={PayFactor}/>
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/payment/result" exact component={PaymentResult}/>
                        <Route path="/advertisement/list" exact component={AdvertisementList}/>
                    </div>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isLoggedIn : state.user.isLoggedIn }
}

export default connect(mapStateToProps, { setIsLoggedInStatus, getCurrentUser })(App)