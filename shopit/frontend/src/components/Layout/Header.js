import React, { Fragment ,useEffect} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHeart, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons'
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import '../../App.css';
// import '../../styles/navbar.css'
import { useAlert } from 'react-alert';

import { getAllCategory } from '../../actions/categoryActions';
import { logout } from '../../actions/userActions';
import { getCartItems } from '../../actions/cartActions';
  const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  
  
  const { user, loading } = useSelector(state => state.auth);
  // console.log('user',user)

  const {cartItems}  = useSelector(state => state.cart);
  
  // console.log('dddddddddddddddddd',cartItems.name)
  

  // console.log('dileep result',result)
  const { wishItems } = useSelector(state => state.wish);

  // const category = useSelector(state => state.allCategories);

useEffect(() => {
  dispatch(getAllCategory());
}, [dispatch]);

useEffect(() => {
  dispatch(getCartItems());
}, [dispatch]);

const logoutHandler = () => {
  dispatch(logout());
  alert.success('Logged out successfully.')
}

const generatePublicUrl = (fileName) => {
  return `http://localhost:4000/uploads/${fileName}`;
}

  return (
    <Fragment>
      {/* <div className="n-row"> */}
          {/* <div className="n-col pl-20"> */}
            {/* <span className='n-email'>ricpewebcode@gmail.com</span> */}
            {/* {
              user ? (<Link to='/account'><FontAwesomeIcon icon={faUser} /> 
              {user.email}</Link>) : (<span><FontAwesomeIcon icon={faUser} /> Guest</span>)
            } */}
          {/* </div> */}
          {/* <div className="n-col">
                <div className="socials">
                    <a href="/"><img src="/images/socials/facebook.png" alt="" /></a>
                    <a href="/"><img src="/images/socials/instagram.png" alt="" /></a>
                    <a href="/"><img src="/images/socials/twitter.png" alt="" /></a>
                    <a href="/"><img src="/images/socials/youtube.png" alt="" /></a>
                </div>
          </div> */}
      {/* </div> */}
      {/* <div className="n-row"> */}
          {/* <nav className="nav"> */}
              {/* <ul className="items">
                  <li className="list"><Link to="/" >Home</Link></li>
                  <li className="list"><Link to="/shop" >Shop</Link></li>
                  <li className="list"><Link to="/about" >About</Link></li>
                  <li className="list"><Link to="/contact" >Contact</Link></li>
              </ul> */}
          {/* </nav> */}
      {/* </div> */}
      <nav className="navbar n-row">
        <div className="col-md-2">
          <div className="navbar-brand">
            <Link to="/">
              <img src="../images/logo.png" alt="shopit-logo" width="100%"/>
            </Link>
          </div>
        </div>

        <div className="col-md-6 ">
          <Search />
        </div>

        <div className="col-md-4 icons">
        <div className="row">
          <div className="col-md-6">
          <Link to="/wish"><span><FontAwesomeIcon icon={faHeart} />
            {wishItems.length > 0 && (<span className='totalItems'>{wishItems.length}
            </span>)}
          </span>
          </Link>
          
          <Link to="/cart">
          <span><FontAwesomeIcon icon={faShoppingBag} />
          {/* {  */}
            
            <span className='totalItems'>
            { Object.keys(cartItems).reduce((acc,item) => (acc + Number(cartItems[item].quantity)), 0)}
            </span>
          {/* } */}
          </span>
          </Link>
          </div>
          <div className="col-md-6">
          {user ? (

            <div className="ml-4 dropdown d-inline">

              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <figure className="avatar avatar-nav">
                  <img
                    src={generatePublicUrl(user.avatar) }
                    alt={user }
                    className="rounded-circle" />
                  <span>{user.userName}</span>
                </figure>
                
              </Link>

              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

              {user && user.role === 'admin' && ( 
                  <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                )} 

                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                <Link className="dropdown-item" to="/me">Profile</Link>
                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Logout</Link>
              </div>
            </div>

          ) : !loading &&
          <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
          }
       </div>
       </div>
        </div>
      </nav>
      {/* <div className="menuHeader">
      <ul>
        {category.categories.length > 0 ? renderCategories(category.categories) : null}
      </ul>
    </div> */}
    </Fragment>
  )
}

export default Header;