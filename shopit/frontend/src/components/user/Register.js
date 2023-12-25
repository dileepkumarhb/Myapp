import React, { Fragment, useState } from "react";

import MetaData from "../Layout/MetaData";

// import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";

const Register = () => {
  // const [userName, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [avatar, setAvatar] = useState('')
 
  // const [data, setData] = useState({
  //   userName: " ",
  //   email: " ",
  //   password: " ",
  //   avatar : " "
  // });
  const [userData , setData] = useState({
    userName:"", email:"" , password:"", avatar:""
  })
  //  const [avatar, setAvatar] = useState("");
  //  const [avatarName, setAvatarName] = useState("Choose file");
  //  const { userName, email , password} = formData;
  // const navigate = useNavigate();

  // const { name, email, password, images } = user;


  // const alert = useAlert();
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }

  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch, alert, isAuthenticated, error, navigate]);

//   const submitHandler = e => {
//     e.preventDefault();

//  const payload = new FormData();
// //  for (let img of avatar) {
// //   formData.append("avatar", img);
// // }
//  payload.append("avatar", avatar);
//  payload.append("userName", formData.userName);
//  payload.append("email", formData.email);
//  payload.append("password", formData.password);

//     dispatch(register(...payload));
//   };
const submitHandler = (e) => {
  e.preventDefault();
  console.log('userData',userData)
  dispatch(register(userData))
}
  
  const handleInput = e => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setData({...userData, [name]:value, })
  }
  
  
  const onChange = (e) => {
    // console.log('file',e.target.files[0])
    // setAvatarPreview(URL.createObjectURL(e.target.files[0]))
    setData({...userData, avatar:e.target.files[0]})
  }
 // const generatePublicUrl = (fileName) => {
  //   return `http://localhost:4000/uploads/${fileName}`;
  // }
  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="userName"
                value={userData.userName}
                onChange={(e)=>handleInput(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={(e)=>handleInput(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={userData.password}
                onChange={(e)=>handleInput(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
              <label>Images</label>
                  {/* {avatar.length > 0
                    ? avatar.map((img, index) => (
                      <div key={index}>{img.name}</div>
                    ))
                    : null} */}
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
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;