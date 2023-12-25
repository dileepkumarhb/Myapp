import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate,useParams, useLocation } from 'react-router-dom';
import { login, clearErrors } from '../../actions/userActions';
import {socialGoogle} from '../../actions/socialLoginAction';
// import Google from "../images/google.png";
// import Facebook from "../images/facebook.png";
// import Github from "../../../images/github.png";

import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
// const { token } = useParams();
// console.log('token',token)
const Login = () => {
  
 

  // const github = () => {
  //   window.open("http://localhost:5000/auth/github", "_self");
  // };

  const facebook = () => {
    window.open("http://localhost:4000/auth/facebook", "_self");
  };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const alert = useAlert()
    const dispatch = useDispatch();
  
    let navigate = useNavigate();
    const location = useLocation();
    const google = () => {
      // console.log('google')
      // e.preventDefault();
      
      dispatch(socialGoogle)
      // window.open("/auth/google");
   };
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
console.log('xyz',isAuthenticated)
    const redirect = location.search ? location.search.split('=')[1] : '/'
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate(redirect);
      }
  
      if (error) {
        alert.error(error)
        dispatch(clearErrors())
      }
    }, [dispatch, alert, isAuthenticated, redirect, navigate, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
      }
      
  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Login'} />

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <button className="loginButton google" onClick={google}>
                    <img src="../images/google.png" alt="" className="icon" />
                    Google
                  </button>
                </div>
                <div className="form-group">
                  <div className="loginButton facebook" onClick={facebook}>
                    <img src="../images/facebook.png" alt="" className="icon" />
                    Facebook
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">New User?</Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Login