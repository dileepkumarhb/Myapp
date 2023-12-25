import React  from "react";
// import { useDispatch,useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
// import { getProductsBySlug } from "../../actions/productActions";
// import Layout from "../Layout/index.js";
// import Card from "../UI/Card";
// import { MaterialButton } from "../MaterialUI";
// import Rating from "../UI/Rating";
// import Price from "../UI/Price";
import getParams from "../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";
import "./style.css";


/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = () => {
  
  const renderProduct = () => {
    
    // const params = getParams(props.location.search);
    const location = useLocation();
    const params = getParams(location.search);
    
    let content = null; 
    switch (params.type) {
      case "store":
        content = <ProductStore/>;
        break;
      case "page":
        content = <ProductPage/>;
        break;
      default:
        content = <ClothingAndAccessories/>;
    }

    return content;
  };
  return <>{renderProduct()}</>;
};

export default ProductListPage;




// if requires
// {Object.keys(product.productsByPrice).map((key, index) => {
//   return (
//     <Card
//       headerLeft={`${slug} mobile under ${priceRange[key]}`}
//       headerRight={
//         <MaterialButton
//           title={"VIEW ALL"}
//           style={{
//             width: "96px",
//           }}
//           bgColor="#2874f0"
//           fontSize="12px"
//         />
//       }
//       style={{
//         width: "calc(100% - 40px)",
//         margin: "20px",
//       }}
//     >
//       <div style={{ display: "flex" }}>
//         {product.productsByPrice[key].map((product) => (
//           <Link
//             to={`/${product.slug}/${product._id}/p`}
//             style={{
//               display: "block",
//               textDecoration: "none",
//               color: "#000",
//             }}
//             className="productContainer"
//           >
//             <div className="productImgContainer">
//               <img src={generatePublicUrl(product.images[0].img)} alt="" />
//             </div>
//             <div className="productInfo">
//               <div style={{ margin: "10px 0" }}>{product.name}</div>
//               <div>
//                 <Rating value="4.3" />
//                 &nbsp;&nbsp;
//                 <span
//                   style={{
//                     color: "#777",
//                     fontWeight: "500",
//                     fontSize: "12px",
//                   }}
//                 >
//                   (3353)
//                 </span>
//               </div>
//               <Price value={product.price} />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </Card>
//   );
// })}