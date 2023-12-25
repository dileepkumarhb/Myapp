// import { faCalendar} from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState,useEffect } from "react";
import { DatePicker } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { orderStatusUpdateOrder } from "../../actions/orderActions";
import Sidebar from "./Sidebar";
//import Layout from "../../components/Layout";
import ProgressCard from "../UI/ProgressCard";

import "./style.css";

/**
 * @author
 * @function Orders
 **/
 const { RangePicker } = DatePicker;
const Orders = () => {

  const [statusId, setId] = useState([]);

console.log('statusId',statusId)

  // const navigate = useNavigate();

  const order = useSelector((state) => state.initial);

  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
   
    dispatch(orderStatusUpdateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };
  useEffect(() => {

    setId(order.orders)
    
  }, [order.orders])
  

  const setFilter = (value) => {

  //  let resOne =  moment(values[0]).format("yyyy-MM-DD");
  //  let resTwo = moment(values[1]).format("yyyy-MM-DD");
   
    var temp=[]
   
    for(var items of order.orders){
      items.orderStatus.map(dateStatus=>{
        var res = dateStatus.date ? moment(dateStatus.date).isBetween(moment(value[0]), moment(value[1])):" "
        if(dateStatus.type==="ordered" && res===true){
        temp.push(items)
      }
      })
      
    }

    setId(temp) 
  
    // for(var items of order.orders){
      
    //   items.map((item) =>
    //     console.log('new',item)
    //   )
    //       // if(items.length === 0){
    //         console.log("items",items)
    //           temp.push(items)
    //       // }
    // }
   
    setId(temp)

  }

  return (
    <Fragment>
    <div className="row">
   
    <div className="col-lg-2 col-md-2">
                    <Sidebar />
                    </div>

                    <div className="col-lg-10 col-md-10">
                      <div className='row'>
                       <div className='col-lg-12 col-md-12'>
                       <RangePicker format="YYYY-MM-DD" onChange={setFilter} />
                       </div>
                      </div>
      {statusId.map((orderItem, index) => (
        <ProgressCard
          style={{
            margin: "10px 0",
            height: "50%"
          }}
          key={index}
          headerLeft={orderItem._id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px 50px",
              alignItems: "center",
            }}
          >
            <div>
              <div className="title">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{orderItem.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{orderItem.paymentStatus}</span>
            </div>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              padding: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* select input to apply order action */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {orderItem.orderStatus.map((status) => {
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
            {/* button to confirm action */}

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <button onClick={() => onOrderUpdate(orderItem._id)}>
                confirm
              </button>
            </div>
          </div>
        </ProgressCard>
      ))}
      </div>
      </div>
    </Fragment>
  );
};

export default Orders;