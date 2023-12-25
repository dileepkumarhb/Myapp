import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from '../../actions/cartActions';
import {addOrder} from "../../actions/orderActions"
import {  getAddress  } from "../../actions/addressAction";
import {getCartItems } from "../../actions/cartActions"
//import Layout from "../../components/Layout";
// import MapScreen from '../map/MapScreen';
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../MaterialUI";
import PriceDetails from "../PriceDetails";
import Card from "../UI/Card";
import Cart from "../cart/Cart";
import AddressForm from "./AddressForm";

import "./style.css";

/**
 * @author
 * @function CheckoutPage
 **/

// checkout step card show and hide based on active unactive boolean value
const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({adr,selectAddress,enableAddressEditForm,confirmDeliveryAddress,onAddressSubmit}) => {
  console.log(adr,selectAddress,enableAddressEditForm,confirmDeliveryAddress,onAddressSubmit)
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const userAddress = useSelector((state) => state.userAddress);
  const createOrder = useSelector((state) => state.createOrder);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
const navigate = useNavigate();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
  console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        // const { price, quantity } = cart.cartItems[key];
        return totalPrice + cart.cartItems[key].price * cart.cartItems[key].quantity;
      },
      0
    );

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].quantity,
    }));

    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: 'cod',
    };

    console.log(payload);
    // dispatch(savePayment({ cod }));
    dispatch(addOrder(payload));
    setConfirmOrder(true); 
  };

  useEffect(() => {
    isAuthenticated && dispatch(getAddress());
    isAuthenticated && getCartItems();
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('userAddress',userAddress)
    const address = userAddress.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //userAddress.address.length === 0 && setNewAddress(true);
  }, [userAddress.address]);

  useEffect(() => {
    if (confirmOrder && createOrder.placedOrderId) {
      navigate(`/order_details/${createOrder.placedOrderId}`);
      // navigate(`/order_details/${createOrder.placedOrderId}`);
    }
  }, [createOrder.placedOrderId]);

  return (
    <Fragment>
      <div className="row cartContainer" style={{ display: "-webkit-box", alignItems: "flex-start" }}>
        <div className="col-lg-8 col-md-8 checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!isAuthenticated}
            body={
              isAuthenticated ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{user.name}</span>
                  <span style={{ margin: "0 5px" }}>{user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && isAuthenticated}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : isAuthenticated ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

        </div>
         {/* Price Component */}
         <div className="col-lg-4 col-md-4">
         
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].quantity;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            // const { price, quantity } = cart.cartItems[key];
            return totalPrice + cart.cartItems[key].price * cart.cartItems[key].quantity;
          }, 0)}
         
        />
          
        </div>       
      </div>
      <div className="row p-0 m-0">
        <div className="col-lg-12 col-md-12 p-0 m-0">
        <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <Cart onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
        </div>
        <div className="col-lg-12 col-md-12 p-0 m-0">
        {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}

        </div>
        <div className="col-lg-12 col-md-12 p-0 m-0">
        <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <ul className="form-container">
                  <li>
                    <h2>Payment Options</h2>
                  </li>
                  {/* <li>
                        <div>
                          <input
                            type="radio"
                            name="paymentOption"
                            id="paymentOption"
                            value="cod"
                            checked
                            onChange={(e) => setPaymentOption(e.target.value)}
                          ></input>
                          <label htmlFor="paymentOption">Cash On Delivery</label>
                        </div>
                      </li>
                    <li>
                        <div>
                          <input
                            type="radio"
                            name="paymentOption"
                            id="paymentOption"
                            value="paypal"
                            onChange={(e) => setPaymentOption(e.target.value)}
                          ></input>
                          <label htmlFor="paymentOption">Paypal</label>
                        </div>
                      </li> */}
                      <li>
                        <div>
                          <input
                            type="radio"
                            name="paymentOption"
                            id="paymentOption"
                            value="stripe"
                            onChange={(e) => setPaymentOption(e.target.value)}
                          ></input>
                          <label htmlFor="paymentOption">Stripe</label>
                        </div>
                      </li>
                    </ul>
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutPage;