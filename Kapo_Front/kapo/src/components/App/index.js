import React from 'react'
import { Redirect, Route, Router} from 'react-router-dom'
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
import AdminPanel from '../adminPanel'
import Modal from '../Modal'
import server from '../../apis/server'

class App extends React.Component{
    state = { showModal : false, modalHeader: null, modalBody: null, modalError: null}
    componentDidMount = () => {
        if(localStorage.jwtToken){
            this.props.setIsLoggedInStatus()
            this.props.getCurrentUser()
        }
    }
    hideModal = () => {
        this.setState({ showModal: false })
    }
    showModal = (header, body, error) => {
        this.setState({ showModal: true, modalHeader: header, modalBody: body, modalError: error })
    }
    render(){
        return (
            <>
                { this.state.showModal ? <Modal header={this.state.modalHeader} onSubmit={this.hideModal} error={this.state.modalError}> {this.state.modalBody} </Modal> : null}
                <div className="app-container">
                    <Router history={history}>
                            {/* soooooo dirty!!! */}
                            <Navbar loggedIn={this.props.isLoggedIn ? true : false}></Navbar>
                            <Route path="/" exact component={MainPage}/>
                            <Route path="/ProductList" exact component={() => <AllProducts showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/product/:id" exact component={() => <productDetails showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/AddProduct" exact component={() => <AddProduct showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/Auth/SignIn" exact component={() => <SignIn showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/Auth/SignUp" exact component={() => <SignUp showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/MyProductList" exact component={() => <MyProductList showModal={this.showModal} modal={this.state.showModal}/>} />
                            <Route path="/order/preview/:id" exact component={() => <PreviewOrder showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/order/bank/:id" exact component={() => <Bank showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/order/list" exact component={() => <MyOrders showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/order/factor/:id" exact component={() => <OrderFactor showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/AddProduct/SetPrice/:id" exact component={() => <SetPrice showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/404" exact component={Page404}/>
                            <Route path="/ProductOrders/:id" exact component={() => <ProductOrders showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/changeProduct/:id" exact component={() => <ChangeProduct showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/ProductList/:cat1" exact component={() => <CategoryProducts showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/ProductList/:cat1/:cat2" exact component={() => <CategoryProducts showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/ProductList/:cat1/:cat2/:cat3" exact component={() => <CategoryProducts showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/pay/factor/:id" exact component={() => <PayFactor showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/dashboard" exact component={() => <Dashboard showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/dashboard_admin" exact component={() => <AdminPanel showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/payment/result" exact component={() => <PaymentResult showModal={this.showModal} modal={this.state.showModal}/>}/>
                            <Route path="/advertisement/list" exact component={() => <CategoryProducts showModal={this.showModal} modal={this.state.showModal}/>}/>
                    </Router>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { isLoggedIn : state.user.isLoggedIn }
}

export default connect(mapStateToProps, { setIsLoggedInStatus, getCurrentUser })(App)