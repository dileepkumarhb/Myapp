// TODO: Show user details on update

import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../Layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = () => {

  const [userData , setData] = useState({
    userName:"",email:"",role:""
  })

  // const [userName, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [role, setRole] = useState('')

  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated } = useSelector(state => state.user);
  const { user } = useSelector(state => state.userDetails);
  console.log('userData',user)
  const userId = id;
  // if(user){
   
  // }

  useEffect(() => {

    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId))
    }
    else{
       setData(user)
    }

    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User updated successfully')

      navigate('/admin/users')

      dispatch({
        type: UPDATE_USER_RESET
      })
    }

  }, [ isUpdated, userId, user])
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('userData',userData)
    dispatch(updateUser(user._id, userData))
  }

  const handleInput = e => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setData({...userData, [name]:value, })
  }
  
  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="userName"
                    value={userData.userName}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name='email'
                    value={userData.email}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name='role'
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default UpdateUser