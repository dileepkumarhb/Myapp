import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/productActions";
import { Link,useParams } from "react-router-dom";
import Card from "../../UI/Card";
import { MaterialButton } from "../../MaterialUI";
import Rating from "../../UI/Rating";
import Price from "../../UI/Price";
// import ProductByPrice from "../../product/ProductByPrice";
/**
 * @author
 * @function ProductStore
 **/

const ProductStore = () => {
  const product = useSelector((state) => state.productList);

  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    
    dispatch(getProductsBySlug(slug));
  }, []);

  const priceRange = product.priceRange;
  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
 }

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        // console.log('iddddd',product.productsByPrice[key])
        return (
          <Card
            headerLeft={`${slug} mobile under ${priceRange[key]}`}
            headerRight={
              <Link
                  to={`/ProductByPrice/${slug}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#000",
                  }}>
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
              </Link>
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
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
          </Card>
        );
      })}
    {/* <ProductByPrice product={product} priceRange={priceRange}/> */}
    </>
  );
};

export default ProductStore;