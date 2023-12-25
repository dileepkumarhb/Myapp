import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProductsBySlug } from "../../../actions/productActions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

import "./style.css";

/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = () => {
  const product = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
   
    dispatch(getProductsBySlug(slug));
  }, []);

  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }
//  product.products.map((product) => (
//   console.log(product)
//  ))
  return (
    <div style={{ padding: "10px" }}>
    <Card
      style={{
        boxSizing: "border-box",
        padding: "10px",
        display: "flex",
      }}
    >
      {product.products.map((product) => (
        <div className="caContainer">
          <Link
            className="caImgContainer"
            to={`/${product.slug}/${product._id}/p`}
          >
            <img src={generatePublicUrl(product.images[0].img)} alt={product.name}/>
          </Link>
          <div>
            <div className="caProductName">{product.name}</div>
            <div className="caProductPrice">
              <BiRupee />
              {product.price}
            </div>
          </div>
        </div>
      ))}
    </Card>
  </div>
  );
};

export default ClothingAndAccessories;