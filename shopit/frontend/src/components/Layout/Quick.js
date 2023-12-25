// import axios from 'axios'
import React ,{ useState} from 'react'
import { memo } from "react";
import {useDispatch} from 'react-redux'
// import { useParams } from 'react-router-dom';
// import { Carousel } from 'react-bootstrap'
import '../../styles/quick.css'
import { addItemToCart } from '../../actions/cartActions'
import { useAlert } from 'react-alert'

const Quick = ({id,product}) => {
    
    const [quantity, setQuantity] = useState(1)
 //for change image
 const [selectedImage, setSelectedImage] = useState(''); //default is empty
  //For close PopUp
  const [style, setStyle] = useState("main-container");

  const dispatch = useDispatch();
  const alert = useAlert();
//   const { id } = useParams();

  const changeStyle = () => {
    setStyle("main-containerOne");
  };


  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success('Item Added to Cart')
  }

  const increaseQty = () => {
    const count = document.querySelector('.count')

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty)
  }

  const decreaseQty = () => {

    const count = document.querySelector('.count')

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty)

  }

    // const addToWishHandler = () => {

    //     const existItem = wish.wishItems.find((x) => x._id === item._id);
    //     const quantity = existItem ? existItem.quantity : 1;
        
    //     //const { data } = await axios.get(`/api/products/slug/${product.slug}`);
    //     if (existItem) {
    //         window.alert('Sorry. You have already added the product to your wish list.');
    //         return;
    //     }
        
    //     ctxDispatch({
    //       type: 'WISH_ADD_ITEM',
    //       payload: { ...item, quantity },
    //       });
    // }
    const generatePublicUrl = (fileName) => {
        return `http://localhost:4000/uploads/${fileName}`;
     }
    return (
    <div className={style}>
        <div className="card-quick" key={product._id}>
            <div className="card-row">
                <div className="card-images">
                
                   
                    <div className="card-top">
                       
                        <img src={selectedImage || generatePublicUrl(product.images[0].img)} alt={product.name} />
                    </div>
                    <div className="card-bottom">
                    {product.images && product.images.map(item=>(
                            <img src={generatePublicUrl(item.img)} onClick={() => setSelectedImage(`${generatePublicUrl(item.img)}`)} alt={item._id} />
                            ))}
                    </div>
                   
                  
                </div>
            </div>
            <div className="card-row">
                <div className="first-div div">
                    <h2 className='title'>{product.name}</h2>
                    {/* <p className='category'>{item.category}</p> */}
                </div>
                <div className="second-div div">
                    <span className="price">Price: ${product.price}</span>
                    <div className="quantity">
                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                        <input type="number" className="form-control count d-inline" 
                        value={quantity}
                        readOnly />
                        {/*  */}
                        <span className="btn btn-primary plus" onClick={increaseQty} >+</span>
                    </div>
                </div>
                <div className="third-div div">
                    <p className="desc">{product.description}</p>
                </div>
                <div className="fourth-div div">
                    {product.stock === 0 ? (
                        <button className='cart cart-out' disabled >Out of stock</button>
                        ) : (
                        <button className='cart' onClick={addToCart}>Add to Cart</button>)
                    }
                    {/* onClick={addToWishHandler} */}
                    <button className='wish' >Add to Wish</button>
                </div>
            </div>
        </div>
        <button className='back'  onClick={changeStyle}>Close</button>
    </div>
    )
}

export default memo(Quick)
