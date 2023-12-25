import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions/productActions";
import { Link,useParams } from "react-router-dom";
import Card from "../UI/Card";
import { MaterialButton } from "../MaterialUI";
import Rating from "../UI/Rating";
import Price from "../UI/Price";

const ProductByPrice = () => {
  console.log('state',(state) => state.productList);
  const product = useSelector((state) => state.productList);
console.log('pddd',product)
  const dispatch = useDispatch();
  const { price } = useParams();

  useEffect(() => {
    
    dispatch(getProductsBySlug(price));
  }, [price]);

  const priceRange = product.priceRange;
  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }

  return (
    <>
    {product.productsByPrice ? Object.keys(product.productsByPrice).map((key, index) => {
      console.log( product.productsByPrice[index])
      return (
    
          <div style={{ display: "flex" }}>
            { 
             product.productsByPrice ||  product.productsByPrice[key].filter((product,index) => (
                     product.price < price
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
    }) : ""}
  </>
  )
}

export default ProductByPrice
