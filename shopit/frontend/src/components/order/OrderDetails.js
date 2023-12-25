import React, { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
// import Loader from '../Layout/Loader'

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../actions/orderActions'

export default function OrderDetails() {

  // const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderDet = useSelector((state) => state.orderDetails);

  

  const isPaid = orderDet.order && orderDet.order.paymentStatus === 'completed' ? true : false;
  
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [])

  const addr = orderDet.order ? orderDet.order.address : ''

  const oStatus = orderDet.order ? orderDet.order.orderStatus  :''
 
   const  prodDetails = orderDet.order ? orderDet.order.items : ''
  
 
   prodDetails && prodDetails.map( prod => (
    console.log(prod)
   ))
  
   const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }
   

  return (
    <Fragment>
      <MetaData title={'Order Details'} />
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details"> 

              <h1 className="my-5">Order #{orderDet.order ? orderDet.order._id : ''} </h1>

              <h4 className="mb-4">Shipping Info</h4>
          
                <p><b>Name:</b> { addr ? addr.name :''}</p>
                <p><b>Phone:</b> { addr ? addr.mobileNumber :''}</p>
                {/* <p className="mb-4"><b>Address: </b>{shippingDetails}</p> */}
                  <p><b>Amount:</b> ${orderDet.order ? orderDet.order.totalAmount : ''}</p> 
              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

              <h4 className="my-4">Order Status:</h4>
                {oStatus && oStatus.map(items => (
                // console.log(items.type === "completed" && items.isCompleted ===true )
                <p className={items.type  && items.isCompleted ===true ? "greenColor" : "redColor"}
                ><b>{items.type}</b></p>
                ))}



              <h4 className="my-4">Order Items:</h4>

              <hr />
             
              <div className="cart-item my-1">

                 {prodDetails && prodDetails.map( prod => (

                  //  console.log(prod.productId.images[0].img)

                  <div key={prod.productId} className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img src={generatePublicUrl(prod.productId.images[0].img)} alt={
                        prod.productId.images[0].img} height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/products/${prod.productId._id}`}>{prod.productId.name}</Link>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${prod.payablePrice}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{prod.purchasedQty} Piece(s)</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          </div>
    </Fragment>
  )
}