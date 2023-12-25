import React, { useState } from 'react'
import { faEye, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Quick from '../Layout/Quick';
import { addItemToCart } from '../../actions/cartActions'
import { addItemToWish } from '../../actions/wishActions'
import '../urlConfig/index'
function Product({product,col}) {
  
//console.log('fil',files)
  const [open, setOpen] = useState(false);
  // const { isAuthenticated } = useSelector(state => state.auth)
  const {cartItems } = useSelector(state => state.cart)

  const { wishItems } = useSelector(state => state.wish)

  const alert = useAlert();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(getCartItems());
  //   }
  // }, [isAuthenticated]);

  // const addToCart = () => {    
    
   
  //   dispatch(addItemToCart({ _id, name, price, img, stock ,quantity }));
  //   navigate(`/cart`);
  
     
  // }

  const addToCart = () => {
    //  const id = product._id
    const existItem = Object.keys(cartItems).find((x) => cartItems[x]._id === product._id);
    console.log('existItemmmmmmmm',existItem)
    const quantity = existItem ? Object.keys(cartItems).map((key,index) => cartItems[key].quantity + 1 ) : 1;
    console.log('existemquantity',quantity)
    const { _id, name, price,stock  } = product;
    //const img = product.images[0].img;
    dispatch(addItemToCart({ _id, name, price, stock ,quantity }));
    alert.success('Item Added to Cart')
  }
 
  const addToWishHandler = () => {
    const id = product._id
    const existItem = wishItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity : 1;
    
    //const { data } = await axios.get(`/api/products/slug/${product.slug}`);
    if (existItem) {
        window.alert('Sorry. You have already added the product to your wish list.');
        return;
    }
    dispatch(addItemToWish(id, quantity));
    alert.success('Item Added to Cart')
  }

 //console.log('check product',product.images[0].img)

const generatePublicUrl = (fileName) => {
   return `http://localhost:4000/uploads/${fileName}`;
}

  return (
    <div key={product._id} className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
  
         <div className="card p-3 rounded">
          {/* {console.log(product.images[0].img)} */}
            <img alt={product.name} src={generatePublicUrl(product.images[0].img)}  />
           <div className="card-body d-flex flex-column">
             <h5 className="card-title">
               <Link to={`product/${product._id}`}>{product.name}</Link>
             </h5>
             <div className="ratings mt-auto">
               <div className="rating-outer">
                 <div className="rating-inner" style={{width:`${(product.ratings/5)*100}%`}}></div>
               </div>
               <span id="no_of_reviews">({product.numOfReviews}Reviews)</span>
             </div>
             <p className="card-text">{product.price}</p>
            <div className="card-footer">
            <button onClick={() => setOpen(true)} className="eye">
              <FontAwesomeIcon icon={faEye} /></button>
            <button>
            {/* onClick={addToWishHandler} */}
              <FontAwesomeIcon icon={faHeart}  onClick={addToWishHandler} />
              </button>
            {product.stock === 0 ? (
            <button className='cart cart-out' disabled >Out of stock</button>
            ) : (
              // onClick={addToCart}
            <button><FontAwesomeIcon icon={faShoppingBag} onClick={addToCart}/></button>)
            }
            </div>
             <Link to={`product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
           </div>
           {open && <Quick id={product._id} product={product} />}
         </div>
       </div>
  )
}

export default Product