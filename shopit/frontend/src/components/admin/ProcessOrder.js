import React, {Fragment, useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'
import store from '../../store'
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { getInitialData } from '../../actions/initialDataAction'
import {getOrderDetails, orderStatusUpdateOrder, clearErrors} from '../../actions/orderActions'
import {UPDATE_ORDER_RESET} from '../../constants/orderConstants'

export default function ProcessOrder() {
  

  const alert = useAlert();
  const dispatch = useDispatch();
  const {id} = useParams();

  const {loading, order = {}} = useSelector(state => state.orderDetails)

  console.log('order',order)
  const {
    address,
    items,
    paymentStatus,
    // user,
    totalAmount,
    orderStatus
  } = order;
  const {error, isUpdated} = useSelector(state => state.order)

  const orderId = id;

  useEffect(()=>{
    store.dispatch(getInitialData())
  },[dispatch])

  useEffect(() => {

    dispatch(getOrderDetails(orderId))

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('Order updated successfully');
      dispatch({type: UPDATE_ORDER_RESET})
    }

  }, [dispatch, alert, error, isUpdated, orderId])
  const [type,setType] = useState('');
  const updateOrderHandler = (orderId) => {
    // const formData = new FormData();
    // formData.set('type', type);
    // console.log()
    const payload = {
      orderId,
      type
    };
    dispatch(orderStatusUpdateOrder(payload))

   
   
    // dispatch(orderStatusUpdateOrder(payload));
  }

  const shippingDetails = address && 
   `${address.address}, 
    ${address.cityDistrictTown}, 
    ${address.pinCode}, 
    ${address.state}`

  const isPaid = paymentStatus && paymentStatus === 'completed'

  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }

  return (
    <Fragment>
      <MetaData title={`Process Order #{order && order._id}`}/>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar/>
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading
              ? <Loader/>
              : (
                <div className="row d-flex justify-content-around">
                  <div className="col-12 col-lg-7 order-details">

                    <h1 className="my-4">Order #{order._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p>
                      <b>Name: </b>
                      {address && address.name}</p>
                    <p>
                      <b>Phone: </b>
                       {address && address.mobileNumber}</p>
                    <p className="mb-4">
                      <b>Address:</b> {shippingDetails}</p>
                    <p>
                      <b>Amount: </b>
                       ${totalAmount}</p>

                    <hr/>

                    
              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

              <h4 className="my-4">Stripe ID</h4>
              {/* <p><b>{paymentStatus && paymentStatus}</b></p> */}

              <h4 className="my-4">Order Status:</h4>
                    {orderStatus && orderStatus.map(item => (
                // console.log(items.type === "completed" && items.isCompleted ===true )
                <p className={item.type  && item.isCompleted ===true ? "greenColor" : "redColor"}
                ><b>{item.type}</b></p>
                    ))}

                    <h4 className="my-4">Order Items:</h4>

                    <hr/>
                    <div className="cart-item my-1">
                    {items && items.map(item => (
                      // console.log('item',item)
                  <div key={item.productId} className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img src={generatePublicUrl(item.productId.images[0].img)} alt={item.name} height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/products/${item.productId._id}`}>{item.productId.name}</Link>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${item.payablePrice}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.purchasedQty} Piece(s)</p>
                    </div>
                  </div>
                ))}
                    </div>
                    <hr/>
                  </div>

                  <div className="col-12 col-lg-3 mt-5">
                    <h4 className="my-4">Status</h4>

                    <div className="form-group">
                      <select className='form-control' onChange={(e) => setType(e.target.value)}>
                        <option value={""}>select status</option>
                        {orderStatus && orderStatus.map((status) => {
                          return (
                            <>
                              {!status.isCompleted ? (
                                <option key={status.type} value={status.type}>
                                  {status.type}
                                </option>
                              ) : null}
                            </>
                          );
                        })}
                      </select>
                    </div>

                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                      Update Status
                    </button>
                  </div>

                </div>
              )}
          </Fragment>
        </div>
      </div>

    </Fragment>
  );
}