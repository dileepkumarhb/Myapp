import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Modal from '../UI/Modal';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

export default function UpdateProfile() {

  const [userData , setUserData] = useState({
    userName:"", email:"" , avatar:""
  })
  // const [oldAvatar, setOldAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user)
  // console.log('user',isUpdated)

  useEffect(() => {
    if (user) {
      setUserData(user)
      // setOldAvatar(user.avatar);
    }

    if (error) {
      alert.error(error)
      dispatch(clearErrors)
    }

    if (isUpdated) {
      var i=0;
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            alert.success('User updated successfully.')
              dispatch(loadUser());

              // navigate('/me')

              dispatch({
              type: UPDATE_PROFILE_RESET
              })
            
            i = 0;
          } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width  + "%";
          }
        }
      }

    }
  }, [dispatch, alert, user, navigate, error, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('data',userData)
    dispatch(updateProfile(userData))
  }

  const handleInput = e => {
    setUserData({...userData, [e.target.name]:e.target.value, })
  }

  const onChange = (e) => {
    console.log('file',URL.createObjectURL(e.target.files[0]))
    
     setAvatarPreview(e.target.files[0])
     setUserData({...userData, avatar:e.target.files[0]})
  }

const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }
  return (
//     <style>
//       #myProgress {
//   width: 100%;
//   background-color: #ddd;
// }


//     </style>
    <Fragment>
      <MetaData title={'Update Profile'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name='userName'
                value={userData.userName}
                onChange={handleInput}
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
                onChange={handleInput}
                 />
            </div>
            {/* <Modal
            show={show}
            handleclose={handleclose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        > */}
            <div  style={{width:'100%', height: '30px', backgroundColor :"#ddd",
                    textAlign : 'center',
                    lineHeight: '30px',
                    color: 'white',
                    margin: '20px 0px 0px 0px'
                    }}>
                    <div id="myBar" style={{width: '100%',backgroundColor:' #04AA6D'}} >

                    </div>
                    </div>
            {/* <Modal/> */}
            <div className='form-group'>
                  <label>Images</label>

                  <div className='custom-file'>
                    <input
                      type='file'
                      name='avatar'
                      // value={user.avatar}
                      className='custom-file-input'
                      id='customFile'
                      accept="image/*"
                      onChange={onChange}
                      multiple
                    />
                    
                    <label className='custom-file-label' htmlFor='customFile'>
                      Choose Images
                    </label>
                  </div>
                  <div  style={{width:'10%',height: '10px', backgroundColor :' #04AA6D',
  textAlign : 'center',
  lineHeight: '30px',
  color: 'white',
  margin: '20px 0px 0px 0px'
  }}>
                    <div id="myBar" style={{width: '100%',backgroundColor: '#ddd'}}>
                
                   </div>
                  </div>
                  { 
                  avatarPreview ? <img src={URL.createObjectURL(avatarPreview)} key={avatarPreview}  alt={avatarPreview} className=" mt-3 mr-2" width="55" height="52" /> 
                  : <img src={generatePublicUrl(userData.avatar)} key={userData.name} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" /> 
                  } 
                </div>
                
            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}>
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}