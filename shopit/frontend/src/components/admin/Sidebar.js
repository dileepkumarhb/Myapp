import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import store from "../../store";
// import { getInitialData } from '../../actions/initialDataAction';
export default function Sidebar() {
const dispatch = useDispatch();
  // useEffect(()=>{
  //  dispatch(getInitialData());
  // },[dispatch])
  return (
    <div>
      <div className="row">
        <div className="com-md-10 col-lg-12">
          <div className="sidebar-wrapper">
            <nav id="sidebar">
              <ul className="list-unstyled components">
                <li>
                  <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                </li>

                <li>
                  <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                    className="fa fa-product-hunt"></i> Products</a>
                  <ul className="collapse list-unstyled" id="productSubmenu">
                    <li>
                      <Link to="/admin/initialData"><i className="fa fa-clipboard"></i> All</Link>
                    </li>

                    <li>
                      <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                    </li>
                  </ul>
                  <a href="#categorySubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                    className="fa fa-category-hunt"></i> Category</a>
                  <ul className="collapse list-unstyled" id="categorySubmenu">
                  <li>
                      <Link to="/admin/category"><i className="fa fa-plus"></i>Create Category</Link>
                    </li>
                    </ul>
                    <a href="#bannerSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                    className="fa fa-banner-hunt"></i> Banner</a>
                  <ul className="collapse list-unstyled" id="bannerSubmenu">
                  <li>
                      <Link to="/admin/banner"><i className="fa fa-plus"></i>Create Banner</Link>
                    </li>
                    </ul>
                </li>
                   <li>
                      <Link to="/admin/getOrders"><i className="fa fa-plus"></i>Order Status</Link>
                    </li>
                <li>
                  <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                </li>

                <li>
                  <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                </li>

                <li>
                  <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                </li>


              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}