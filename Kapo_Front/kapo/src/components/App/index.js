import React from 'react'
import { Switch, Route, Router} from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../../history'
import { setIsLoggedInStatus, getCurrentUser } from '../../actions'

import '../../style.scss'
import './index.scss'

import ProductDetails from '../product-details'
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
import Page404 from '../basic/404'
import MyOrders from "../MyOrders"
import ProductOrders from "../ProductOrders"
import ChangeProduct from '../changeProduct'
import CategoryProducts from "../categoryProducts"
import PayFactor from '../payFactor'
import Dashboard from '../dashboard'
import PaymentResult from '../basic/paymentResult'
import AdminPanel from '../adminPanel'
import Modal from '../Modal'

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
                            <Navbar loggedIn={this.props.isLoggedIn ? true : false}></Navbar>
                            <Switch>
                                <Route path="/" exact component={MainPage}/>
                                <Route path="/ProductList" exact component={AllProducts}/>
                                <Route path="/product/:id" exact component={(props) => <ProductDetails {...props} showModal={this.showModal}/>}/>
                                <Route path="/AddProduct" exact component={AddProduct}/>
                                <Route path="/Auth/SignIn" exact component={() => <SignIn showModal={this.showModal}/>}/>
                                <Route path="/Auth/SignUp" exact component={() => <SignUp showModal={this.showModal}/>}/>
                                <Route path="/MyProductList" exact component={MyProductList} />
                                <Route path="/order/preview/:id" exact component={PreviewOrder}/>
                                <Route path="/bank/:id" exact component={Bank}/>
                                <Route path="/order/list" exact component={MyOrders}/>
                                <Route path="/order/factor/:id" exact component={OrderFactor}/>
                                <Route path="/ProductOrders/:id" exact component={ProductOrders}/>
                                <Route path="/changeProduct/:id" exact component={ChangeProduct}/>
                                <Route path="/ProductList/:cat1" exact component={CategoryProducts}/>
                                <Route path="/ProductList/:cat1/:cat2" exact component={CategoryProducts}/>
                                <Route path="/ProductList/:cat1/:cat2/:cat3" exact component={CategoryProducts}/>
                                <Route path="/pay/factor/:id" exact component={PayFactor}/>
                                <Route path="/dashboard" exact component={Dashboard}/>
                                <Route path="/adminDashboard" exact component={AdminPanel}/>
                                <Route path="/payment/result/success" exact component={(props) => <PaymentResult {...props} success={true} /> }/>
                                <Route path="/payment/result/fail" exact component={(props) => <PaymentResult {...props} success={false} /> }/>
                                <Route path="/advertisement/list" exact component={CategoryProducts}/>
                                <Route component={Page404}/>
                            </Switch>
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