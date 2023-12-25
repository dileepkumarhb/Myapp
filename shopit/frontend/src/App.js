import React, { useEffect, useState,withRouter } from 'react'
// import React, { withRouter } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import store from './store'
//stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import ProductByPrice from './components/product/ProductByPrice';
import MenuHeader from './components/MenuHeader';
// import ProductHomePage from './components/ProductHomePage'
import ProductListPage from './components/ProductListPage';
import NewBanner from './components/NewBanner';
// import MapScreen from './components/map/MapScreen';
// import Slider from './components/layout/Slider';

// Auth or User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';


// Cart imports
import Wish from './components/wish/Wish';
import Cart from './components/cart/Cart';
import CheckoutPage from './components/CheckoutPage';
import OrderPage from './components/order/OrderPage';
import OrderScreen from './components/PaypalButton/OrderScreen';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess'

// Admin imports
import Dashboard from "../src/components/admin/Dashboard";
import ProductsList from "../src/components/admin/ProductsList";
import NewProduct from './components/admin/NewProduct';
import NewCategory from './components/admin/NewCategory'
import OrderStatus from './components/admin/OrderStatus'
import UpdateProduct from './components/admin/UpdateProduct';
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import ProductReviews from './components/admin/ProductReviews'

//order
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

import OrderDetailsPage from './components/order/OrderDetailsPage';

import { loadUser } from './actions/userActions'
// import { getAllCategory } from './actions/categoryActions';

// import { initialData } from '../../backend/controllers/initialData';
import { getInitialData } from './actions/initialDataAction';
// import {
//   getAllCategory,
//   addCategory,
//   updateCategories,
//   deleteCategories as deleteCategoriesAction
// } from './actions/categoryActions';
// import { getAdminProducts } from './actions/productActions';
// import { updateCart, getCartItems } from "./actions/cartActions";
// import { getProducts } from './actions/productActions'

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  const { isAuthenticated, user } = useSelector(state => state.auth)

  // const dispatch = useDispatch()





  useEffect(() => {
    // store.dispatch(getAllCategory())
    // store.dispatch(getAdminProducts())
    store.dispatch(getInitialData)
    store.dispatch(loadUser())
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    // getStripeApiKey();
  }, [])

  // useEffect(() => {
  //   console.log("App.js - updateCart");
  //   dispatch(updateCart());
  //   dispatch(getCartItems())
  // }, [isAuthenticated]);
  return (

    <div className="App">
      <BrowserRouter>
        <Header />
        <MenuHeader />
        {/* <Slider/> */}
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />}  />
            <Route path="/wish" element={<Wish />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderPage />} />
            
            <Route path="search/:keyword" element={<Home />} />
            <Route path="product/:id" element={<ProductDetails />} exact />
            <Route path="/ProductByPrice/:price" element={<ProductByPrice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="password/forgot" element={<ForgotPassword />} exact />
            <Route path="password/reset/:token" element={<NewPassword />} exact />
            <Route path="/:slug" element={<ProductListPage />} exact />
            {/* <Route path="/map" element={<MapScreen />} /> */}

            <Route path="/order_details/:orderId" element={isAuthenticated ? (<OrderScreen />) : (<Navigate replace to="/login" />)} />
            <Route path="/order/confirm" element={isAuthenticated ? (<ConfirmOrder />) : (<Navigate replace to="/login" />)} />
            {stripeApiKey &&
              <Route path="/payment" element={isAuthenticated ? (<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>) : (<Navigate replace to="/login" />)} />
            }
            <Route path="/success" element={isAuthenticated ? (<OrderSuccess />) : (<Navigate replace to="/login" />)} />


            <Route path="/orders/me" element={isAuthenticated ? (<ListOrders />) : (<Navigate replace to="/login" />)} />
            <Route path="/order/:id" element={isAuthenticated ? (<OrderDetails />) : (<Navigate replace to="/login" />)} />

            <Route path="/order_details/:orderId" element={isAuthenticated ? (<OrderDetailsPage />) : (<Navigate replace to="/login" />)} />

            <Route path="/me" element={isAuthenticated ? (<Profile />) : (<Navigate replace to="/login" />)} />
            <Route path="/me/update" element={isAuthenticated ? (<UpdateProfile />) : (<Navigate replace to="/login" />)} />
            <Route path="/password/update" element={isAuthenticated ? (<UpdatePassword />) : (<Navigate replace to="/login" />)} />

          </Routes>
        </div>
        <Routes>
          <Route path="/dashboard" element={isAuthenticated && user.role === 'admin' ? (<Dashboard />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/initialData" element={isAuthenticated && user.role === 'admin' ? (<ProductsList />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/product" element={isAuthenticated && user.role === 'admin' ? (<NewProduct />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/category" element={isAuthenticated && user.role === 'admin' ? (<NewCategory />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/getOrders" element={isAuthenticated && user.role === 'admin' ? (<OrderStatus />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/banner" element={isAuthenticated && user.role === 'admin' ? (<NewBanner />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/product/:id" element={isAuthenticated && user.role === 'admin' ? (<UpdateProduct />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/users/" element={isAuthenticated && user.role === 'admin' ? (<UsersList />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/user/:id" element={isAuthenticated && user.role === 'admin' ? (<UpdateUser />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/orders/" element={isAuthenticated && user.role === 'admin' ? (<OrdersList />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/order/:id" element={isAuthenticated && user.role === 'admin' ? (<ProcessOrder />) : (<Navigate replace to="/login" />)} />
          <Route path="/admin/reviews" element={isAuthenticated && user.role === 'admin' ? (<ProductReviews />) : (<Navigate replace to="/login" />)} />
        </Routes>
       
        {
          isAuthenticated && user.role=='admin' ? null: <Footer />  
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
