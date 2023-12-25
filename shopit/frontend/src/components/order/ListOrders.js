import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'

const ListOrders = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(state => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error])

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Num of Items',
          field: 'numOfItems',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        },
      ],
      rows: []
    }
    
    orders.forEach(order => {
      data.rows.push({
        id: order._id,
        numOfItems: order.items.length,
        amount: `$${order.totalAmount}`,
         Ostatus : order.orderStatus.map(statusItem => (
          statusItem.type.includes('delivered') ? 
          <p style={{ color: 'green' }}>{statusItem.type}</p>
          : <p style={{ color: 'red' }}>{statusItem.type}</p>
          )),
        actions:
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
      })
    })

    return data
  }

  return (
    <Fragment>

      <MetaData title={'My Orders'} />

      <h1 className="my-5">My Orders</h1>

      {loading ? <Loader /> : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}

    </Fragment>
  )
}

export default ListOrders 