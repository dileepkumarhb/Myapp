import React, { Fragment,useEffect,useState } from 'react'
import Pagination from 'react-js-pagination';
// import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import MetaData from './Layout/MetaData'
import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
// 
// getAllProducts
import { getProducts } from '../actions/productActions'
//const Slider = require('rc-slider');

import Layout from './Layout/index'
import Product from './product/Product'
import Loader from './Layout/Loader'
import { useAlert } from 'react-alert';

const Home = () => {
  const { loading, products ,error, productsCount,resPerPage,filteredProductsCount } = useSelector(state => state.products)
  // const cart = useSelector(state => state.cart);
  const [currentPage, setCurrentPage] = useState(1);
  const [category] = useState('');
  const [rating, setRating] = useState(0);
  // const [price, setPrice] = useState([1, 1000])
  // const categories = [
  //   'Electronics',
  //   'Cameras',
  //   'Laptops',
  //   'Accessories',
  //   'Headphones',
  //   'Food',
  //   'Books',
  //   'Clothes/Shoes',
  //   'Beauty/Health',
  //   'Sports',
  //   'Outdoor',
  //   'Home'
  // ];
    
   
    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();
  
    // useEffect(()=>{
     
    //   dispatch(getAllProducts())

    // },[dispatch])

    // useEffect(()=>{
     
    //   // dispatch(getProducts())

    // },[dispatch])


    useEffect(()=>{

      if (error) {
        return alert.error(error);
      }
      dispatch(getProducts(keyword,currentPage,category,rating))

    },[dispatch,error,keyword,currentPage,category,rating])

    function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if (keyword) {
      count = filteredProductsCount
    }
  
  return (
    <Fragment>
      {loading ?<Loader/>:(
        <Fragment>
        <MetaData title={'Buy Best Products Online'} />
        <Layout>Home Page</Layout>
        <section id="products" className="container mt-5">
      <div className="row">
        {keyword ? (
          <Fragment>
            <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      {/* <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      /> */}

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">
                          Categories
                        </h4>

                        {/* <ul className="pl-0">
                          {categories.map(category => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              key={category}
                              onClick={() => setCategory(category)
                              }
                            >
                              {category}
                            </li>
                          ))}
                        </ul> */}
                      </div>
                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">
                          Ratings
                        </h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map(star => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              key={star}
                              onClick={() => setRating(star)
                              }
                            >
                              <div className="rating-outer">
                                <div className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`
                                  }}
                                >

                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map(product => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
          </Fragment>
        ) : (
          products && products.map(product=>(
            <Product key={product._id} product={product} col={3}/>
          ))
        )}
        
      </div>
    </section>
    {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )} 
    </Fragment>
    )}
    </Fragment>
  )
}

export default Home