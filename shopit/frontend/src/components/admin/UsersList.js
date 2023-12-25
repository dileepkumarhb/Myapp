import React, { Fragment, useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearErrors, deleteUser } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'

export default function UsersList() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector(state => state.allUsers);
  const { isDeleted } = useSelector(state => state.user);
 const [buttonState, setButtonState] = useState();

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('User deleted successfully.');
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }
    
  }, [dispatch, alert, error, isDeleted, navigate])
  // Get the modal
  // var edit = event.target.className; 
 
  const displayBlock = (event) => {
    var modal = document.getElementById("myModal");
    const edit = event.target.className;
   
      setButtonState(edit)
   
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  const displayNone = (event) => {
    var modal = document.getElementById("myModal"); 
    modal.style.display = "none"; 
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
   
    var modal = document.getElementById("myModal"); 
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc'
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: []
    }

    users.forEach(user => {
      data.rows.push({
        id: user._id,
        name: user.userName,
        email: user.email,
        role: user.role,
        actions: <Fragment>
          {/* <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2" > */}
          <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Modal Header</h2>
              <span onClick={displayNone} className="close">&times;</span>
            </div>
            <div className="modal-body">
              <p>are you sure ? do you want to </p>
              <p>edit or Delete...</p>
            </div>
            <div className="modal-footer">
            {
            
              buttonState==='fa fa-pencil' ? <button onClick={displayNone} className="close"> 
              <Link to={`/admin/user/${user._id}`} className=" py-1 px-2" >
              <i className="fa fa-pencil"></i>
              </Link>
              </button>
              : null
            }
            {
              buttonState ==='fa fa-trash' ?  <button onClick={() => deleteUserHandler(user._id)} className="close"> 
              <i className="fa fa-trash"></i>
              </button> : null

           }
              <button onClick={displayNone} className="close">Cancel</button>

            </div>
          </div>
        </div>
          <button  onClick={displayBlock} value={buttonState}>
            <i className="fa fa-pencil"></i>
          </button>
          {/* </Link> */}
          
          <button  onClick={displayBlock} >
          <i className="fa fa-trash"></i>
          </button>
        </Fragment>
      })
    })

    return data;
  }

  return (
    <Fragment>
      <MetaData title={'All Users'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>

            {loading ? <Loader /> : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}

          </Fragment>
          <h2>Bottom Modal</h2>
        </div>
      </div>
    </Fragment>
  )
}