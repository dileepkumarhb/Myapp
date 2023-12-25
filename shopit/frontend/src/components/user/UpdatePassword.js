import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MetaData from '../Layout/MetaData';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

export default function UpdatePassword() {

  // const [oldPassword, setOldPassword] = useState('');
  // const [password, setPassword] = useState('');
     const [userData ,setUserData] = useState({password:"",oldPassword:""})
  const alert = useAlert()
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user)

  useEffect(() => {

    if (error) {
      alert.error(error)
      dispatch(clearErrors)
    }

    if (isUpdated) {
      alert.success('Password updated successfully.')

      navigate('/me')

      dispatch({
        type: UPDATE_PASSWORD_RESET
      })
    }
  }, [dispatch, alert, user, navigate, error, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.set('oldPassword', oldPassword);
    // formData.set('password', password);

    dispatch(updatePassword(userData))
  }
const handleInput =(e)=>{
  setUserData({...userData, [e.target.name]:e.target.value})
}

  return (
    <Fragment>
      <MetaData title={'Change Password'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                id="old_password_field"
                className="form-control"
                value={userData.oldPassword}
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                name="password"
                id="new_password_field"
                className="form-control"
                value={userData.password}
                onChange={(e) => handleInput(e)} />
            </div>

            <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>Update Password</button>
          </form>
        </div>
      </div>

    </Fragment>
  )
}