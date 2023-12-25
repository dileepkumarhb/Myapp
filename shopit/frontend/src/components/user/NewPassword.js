// TODO: Passwords Do Not Match

import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../Layout/MetaData'

import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'

export default function NewPassword() {

  const navigate = useNavigate();
  const { token } = useParams();
const [userNewPassword ,setuserNewPassword] = useState({
  password:"",confirmPassword:""
})
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')


  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector(state => state.forgotPassword)

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password updated successfully.')
      navigate('/login');
    }

  }, [dispatch, alert, error, success, navigate])

  const submitHandler = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.set('password', password);
    // formData.set('confirmPassword', confirmPassword);
console.log(userNewPassword)
    dispatch(resetPassword(token, userNewPassword))
  }
  const handleIput=(e)=>{
    e.preventDefault();
    console.log(userNewPassword)
    setuserNewPassword({...userNewPassword, [e.target.name]:e.target.value})
  }
  
  return (
    <Fragment>
      <MetaData title={'New Password Reset'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                name="password"
                id="password_field"
                className="form-control"
                value={userNewPassword.password}
                onChange={(e) => handleIput(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                name="confirmPassword"
                className="form-control"
                value={userNewPassword.confirmPassword}
                onChange={(e) => handleIput(e)} />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3">
              Set Password
            </button>

          </form>
        </div>
      </div>
    </Fragment>
  );
}