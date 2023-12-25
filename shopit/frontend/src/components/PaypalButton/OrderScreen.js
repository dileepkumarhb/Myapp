import React, {useState, useEffect ,Fragment} from "react";
import {PayPalButton} from 'react-paypal-button-v2'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useParams} from 'react-router-dom';
// import { getOrder,payOrder } from "../../actions/orderActions";
import {  getOrderDetails, payOrder } from '../../actions/orderActions';
// import Loader from '../Layout/Loader'
// import { useAlert } from 'react-alert';
//import PaypalButton from "./PaypalButton";
//import Layout from "../../components/Layout";
//import Card from "../UI/Card";
//import Price from "../UI/Price";
import {
  // ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../../constants/orderConstants'
import "./style.css";

/**
 * @author
 * @function OrderDetails
 **/

const OrderScreen = () => {
  const params = useParams();
  console.log('params',params)
  const { orderId } = params;
  
console.log('orderId',orderId)

  const [sdkReady, setSdkReady] = useState(false);
  const orderDet = useSelector((state) => state.orderDetails);
  // console.log('orderDetailsssssssssssssssssssssss',orderDetails)
  const { order } = orderDet;
console.log('order',order)
  // console.log('iddddddddddddd',id.orderId)
  const orderPay = useSelector((state) => state.orderPay);
  const {
    // loading: loadingPay,
    // error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    // loading: loadingDeliver,
    // error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  // const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  // const alert = useAlert();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/v1/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      // dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else {
      if (!order.paymentStatus === "completed") {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order])



  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

 
  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }
 if (!(order && order.address)) {
    return null;
  }
  return (
    <Fragment>
      <div >
<div className="placeorder row">
  <div className="placeorder-info col-lg-8 col-md-8">
    <div>
      <h3>
        Shipping
    </h3>
      <div>
        {order.address.name},{order.address.address}, 
        {order.address.cityDistrictTown},
        <p> Landmatrk:{order.address.landmark}</p>
        {order.address.pinCode}, {order.address.state},
    </div>
      <div>
        {order.orderStatus.map(items=>(
            // console.log('order type',items)
        items.type === 'delivered' && items.isCompleted === true ? <span>Delivered</span> :<span>Not Delivered</span> 
        ))}
      </div>
    </div>
    <div>
      <h3>Payment</h3>
      <div>
        Payment Method: {order.paymentType}
      </div>
      <div>paymentStatus
         {order.paymentStatus === "completed" ? <span>Paid </span> :<span>Not Paid</span> }
      </div>
    </div>
    <div>
     <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
    </h3>
          <div>
            Price
    </div>
        </li>
        {

          order.items.length === 0 ?
            <div>
              Cart is empty
    </div>
            :
            order.items.map(item =>
              <li key={item._id}>
                <div className="cart-image">

                  <img src={generatePublicUrl(item.productId.images[0].img)} alt="product" />
                </div>
                <div className="cart-name">
                  <div>

                  </div>
                  <div>
                    Qty: {item.purchasedQty}
                  </div>
                </div>
                <div className="cart-price">
                  ${item.payablePrice}
                </div>
              </li>
            )
        }
      </ul> 
    </div>


  </div>
  <div className="placeorder-action col-lg-4 col-md-4">
    <ul>
  
      <li>
        <h3>Order Summary</h3>
      </li>
      <li>
        <div>Items</div>
        <div>${order.totalAmount}</div>
      </li>
      <li>
        <div>Shipping</div>
        <div>$0</div>
      </li>
      <li>
        <div>Tax</div>
        <div>$0</div>
      </li>
      <li>
        <div>Order Total</div>
        <div>${order.totalAmount}</div>
      </li>
      {!(order.paymentStatus==="completed") && (
                <li>
                  {/* {!sdkReady ? (
                    <Loader/>
                  ) : (
                    <>
                      {errorPay && (
                          alert.error(error)
                        // <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <Loader/>} */}

                      <PayPalButton
                        amount={order.totalAmount}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    {/* </>
                  )} */}
                </li>
              )}
    </ul>



  </div>

</div>
</div>
    </Fragment>
  );
};

export default OrderScreen;