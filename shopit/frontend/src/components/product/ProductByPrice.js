import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions/productActions";
import { Link,useParams } from "react-router-dom";
// import Card from "../UI/Card";
// import { MaterialButton } from "../MaterialUI";
import Rating from "../UI/Rating";
import Price from "../UI/Price";

const ProductByPrice = () => {
  // console.log(state);
  const product = useSelector((state) => state.productList);
//console.log('pddd',product)
  const dispatch = useDispatch();

  let { id } = useParams();
  console.log('slug',id)
  // const priceRange = product.priceRange;
  useEffect(() => {
    dispatch(getProductsBySlug(id));
  }, []);


  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }

  return (
    <>
    { Object.keys(product.productsByPrice).map((key, index) => {
      // console.log( product.productsByPrice[index])
      return (
    
          <div key={product.productsByPrice[index]} style={{ display: "flex" }}>
            { 
             product.productsByPrice &&  product.productsByPrice[key].filter((product,index) => (
                     product.price
                  )).map((product) => (
            
              <Link key={product._id}
                to={`/product/${product._id}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#000",
                }}
                className="productContainer"
              >
                <div className="productImgContainer">
                  <img src={generatePublicUrl(product.images[0].img)} alt="" />
                </div>
                <div className="productInfo">
                  <div style={{ margin: "10px 0" }}>{product.name}</div>
                  <div>
                    <Rating value="4.3" />
                    &nbsp;&nbsp;
                    <span
                      style={{
                        color: "#777",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      (3353)
                    </span>
                  </div>
                  <Price value={product.price} />
                </div>
              </Link>
           
            ))}
          </div>
        // </Card>
      );
    }) }
  </>
  )
}

export default ProductByPrice
