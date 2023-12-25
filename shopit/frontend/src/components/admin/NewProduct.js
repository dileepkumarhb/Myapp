import React, { Fragment, useEffect, useState } from 'react'
import "./components/myCss.css"
import { useNavigate } from 'react-router-dom';
import { TwitterPicker } from "react-color"
import { v4 as uuidv4 } from 'uuid';
import Colors from '../Colors/Colors';
import Modal from '../../components/UI/Modal';
import MetaData from '../Layout/MetaData'
import Sidebar from './Sidebar';
import AddNewProduct from './product/AddNewProduct';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors, updateProduct } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

export default function NewProduct() {
  const [show, setShow] = useState(false);

  const [productModal, setProductMOdal] = useState(false);
  const [price, setPrice] = useState("")
  const [productName, setProductName] = useState("")
  const [seller, setSeller] = useState("")
  const [stock, setStock] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [clrs, setColors] = useState({ colors: [] })
  const [check, setCheck] = useState({ colors: [] })

  const [colorCode, setColorCode] = useState([])
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  console.log('check', check.colors)
  // const [productData, setProductData] = useState({productName:"",price:"",description:"",categoryId:"",
  // stock:"0",seller:"",images:[],colors : []
  // })
  console.log('productData', FormData)
  if (productName == "") {
    //  error = "please fill productname";
  }

  // const handleInput = (e) =>{
  //   setProductData({...productData, ...productData.colors, ...productData.images, [e.target.name]:e.target.value })
  //   // setProductData({...productData, images:[...productData.images, e.target.value] })
  // }



  const imgValidation = () => {
    renderDeleteCategoryModal()
    setShow(true)
  }

  // setProductData({...productData, images:[...productData.images, e.target.files[0]] }) 

  const saveColors = (color) => {
    // const filtered = clrs.colors.filter((clr) => clr.color !== color.hex);
    const filtered = clrs.colors.filter((clr) => clr.color !== color.hex);
    console.log({ colors: [...filtered, { color: color.hex, id: uuidv4() }] })
    // setColors({ colors: [...filtered, { color: color.hex, id: uuidv4() }] })
    setColors({ colors: [...filtered, { color: color.hex, id: uuidv4() }] })

    const filteredCheck = check.colors.filter((check) => check.color !== color.hex);
    setCheck({ ...check, colors: [...filteredCheck, color.hex] })
  }

  const deleteColor = (color) => {
    // const filtered = clrs.colors.filter(clr => clr.color !== color.color);
    const filtered = clrs.colors.filter(clr => clr.color !== color.color);
    setColors({ ...clrs.colors, colors: filtered });
  }
  

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(state => state.newProduct);
  const category = useSelector((state) => state.allCategories);

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', productName);
    formData.set('price', price);
    formData.set('clrs', JSON.stringify(clrs.colors));

    formData.set('check', JSON.stringify(check.colors))
    formData.set('description', description);
    formData.append("category", categoryId);
    formData.set('stock', stock);
    formData.set('seller', seller);

    for (let img of images) {
      formData.append("images", img);
    }
    console.log('formData', formData)
    dispatch(newProduct(formData));
    // dispatch(updateProduct(productData));

  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (success) {
      navigate('/admin/products');
      alert.success('Product created successfully.');
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, alert, error, success, navigate])

  // console.log('check',check)


  const createCategoryList = (categories, options = []) => {

    for (let i = 0; i < categories.length; i++) {

      for (let l = 0; l < categories[i].children.length; l++) {
        for (let cm = 0; cm < categories[i].children[l].children.length; cm++) {
          // console.log('user',categories[i].children[l].children[cm].categoryName,'cm',cm)
          options.push({
            value: categories[i].children[l].children[cm].categoryName._id,
            names: categories[i].children[l].children[cm].categoryName
          })
        }

        options.push({ value: categories[i].children[l]._id, names: categories[i].children[l].categoryName })
      }

      options.push({ value: categories[i]._id, names: categories[i].categoryName });

      for (let i = 0; i <= categories[i].length; i++) {
        createCategoryList(categories, options);
      }
    }

    return options;
  };
  const myFunction = (e) => {

    var element = document.getElementById("error");

    if (productName.length < 8) {
      console.log("text")
      // element.classList.add("hideEroorMsg");
      element.classList.add("hideEroorMsg");
    }

    else {
      element.classList.add("hideEroorMsg");
    }

    element.classList.remove("hideEroor")
    // alert('hello');
  }

  const addError = () => {
    console.log('hello');
    var element = document.getElementById("error");
    element.classList.remove("hideEroorMsg");
    element.classList.add("showErrorMsg");
  }

  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
  }
  const showProductModal = () => {
    addCategorModal();
    setShow(true);
    // setProductMOdal(true)

  }


  const addCategorModal = () => {

    return (
      <Modal
        modalTitle="Confirm"
        show={show}
        handleclose={() => setShow(false)}
        buttons={[
          {
            label: 'No',
            color: 'primary',
            onClick: () => setShow(false)
          },
          // {
          //     label: 'Yes',
          //     color: 'danger',
          //     onClick: closeModalOne
          // }
        ]}
      >
        <div className='form-group'>

        </div>
      </Modal>
    );
  }

  const renderDeleteCategoryModal = () => {

    console.log('new check', check.colors)

    const elements = [];
    clrs.colors.map((result, index) => {
      if (!elements.includes(result.color)) {
        return elements.push(result.color);
      }
    })
    console.log('inner out', elements)
    const closeModal = (e) => {
      setShow(false)
    }
    const newArr = [];
    const colorArr = [];
    const onChange = (e) => {
      setShow(true)
      // if(colorCode.pickColor){
      //    for (let i = 0; i < elements.length; i++) {
      //     elements.splice(elements.indexOf(colorCode.pickColor),1)
      //     colorArr.push(elements)
      //     setSelectedItems([...selectedItems, e.target.value])
      //     setColors({ ...clrs.colors, colors: colorArr }); 

      //   }  
      // }
      // console.log('res1',elements)
      setImages([...images, e.target.files[0]])
    }

    function pickColor(e) {
      setColorCode([...colorCode, e.target.value])
    }

    return (
      <Modal
        modalTitle="Confirm"
        show={show}
        handleclose={() => setShow(false)}
        buttons={[
          {
            label: 'No',
            color: 'primary',
            onClick: () => setShow(false)
          },
          {
            label: 'Yes',
            color: 'danger',
            onClick: closeModal
          }
        ]}
      >
        {/* backgroundColor:imageArr && imageArr[0].split */}

        <div className='form-group'>

          <label>Images  </label>
          <span>choose any of the color <span> </span>
            {/* > newArr.length ? */}
            {/* :newArr.map((newAr,index)=>(
                    
                    <span style={{backgroundColor:newAr}}>color
                      </span>

                      
                   
                 )) */}
            {
              // elements.length 
              <select
                name='pickColor'
                value={colorCode}
                onChange={pickColor}
              >

                {
                  elements.filter((item, i) => !colorCode.find((colorsCode) => item === colorsCode))
                    .map((element, index) => {
                      return <option value={element}>
                        <span tyle={{ backgroundColor: element, width: '20px', height: '20px' }}>
                          {element}
                        </span>
                      </option>
                    })

                  // elements.map((element,index)=>(
                  //     
                  //     ))
                }
              </select>
            }
          </span>
          {/* <p>{colorArr}</p> */}
          {/* {images.length > 0
                    ? images.map((img, index) => (
                      <div key={index}>{img.name}</div>
                    ))
                    : null} */}
          <div className='custom-file'>
            <input
              type="file"
              name='images'
              className='custom-file-input'
              id='customFile'

              onChange={onChange}

            />
            <label className='custom-file-label' htmlFor='customFile'>
              Choose Images
            </label>
          </div>

          {/* { images.map(img => (
                    <img className="mt-3 mr-2" width="55" height="52" key={img._id} src={generatePublicUrl(img.img)} alt="Images Preview" />
                  ))}  */}
        </div>
      </Modal>
    );
  }



  return (
    <Fragment>
      <MetaData title={'New Product'} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />

        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            
            {/* <AddNewProduct 
               productName = {productName}
               price ={price}
               seller = {seller}
               categoryId={categoryId}
               description={description}
               images={images}
               clrs={clrs}
               handleInput = {handleInput}

            /> */}
            <div className="wrapper my-1 mr-4">
            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                <h1 className="mb-4 product_outline">New Product</h1>

                <div className="form-group first-row">
                  <div className='product_name'>
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      name="productName"
                      className="form-control"
                      value={productName}
                      // value={productData.productName}
                      onKeyDown={myFunction.bind(this)}
                      onBlur={addError.bind(this)}
                      // onChange={(e)=>handleInput(e)}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <span className='hideEroorMsg' id='error'>please enter product name</span>
                  </div>
                  <div className='product_price'>
                    <label htmlFor="price_field">Price</label>
                    <input
                      type="text"
                      id="price_field"
                      className="form-control"
                      name="price"
                      value={price}
                      // value={productData.setProductData}
                      // onChange={(e)=>handleInput(e)}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">

                </div>

                <div className="form-group first-row">
                  <div className='catgory_name'>
                    <label htmlFor="category_field">Category</label>
                    <select
                      className="form-control"
                      name="categoryId"
                      value={categoryId}
                      // value={productData.categoryId}
                      // onChange={(e)=>handleInput(e)}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option>select category</option>
                      {  //  console.log('options',category.categories)

                        createCategoryList(category.categories).map((option, index) =>
                        (
                          // console.log('category',option)
                          <option key={option.value} value={option.value}>
                            {option.names}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='product_stock'>
                    <label htmlFor="stock_field">Stock</label>
                    <input
                      type="number"
                      id="stock_field"
                      className="form-control"
                      name="stock"
                      value={stock}
                      // value={productData.stock}
                      // onChange={(e)=>handleInput(e)}
                      onKeyDown={myFunction.bind(this)}
                      onBlur={addError.bind(this)}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group product_description_seller_image">
                  <div className='product_description'>
                    <label htmlFor="description_field">Description</label>
                    <textarea className="form-control"
                      id="description_field"
                      rows="4"
                      name='description'
                      value={description}
                      // value={productData.description}
                      // onChange={(e)=>handleInput(e)}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                  </div>
                  <div className='product_seller_image'>
                    <div className="product_seller">
                      <label htmlFor="seller_field">Seller Name</label>
                      <input
                        type="text"
                        id="seller_field"
                        className="form-control"
                        name="seller"
                        value={seller}
                        // value={productData.seller}
                        // onChange={(e)=>handleInput(e)}
                        onChange={e => setSeller(e.target.value)}
                      />
                    </div>
                    <div className='product_image'>
                      <label>Images</label>
                      {/* {images.length > 0
                      ? images.map((img, index) => (
                      <div key={index}>{img.name}</div>
                      ))
                      : null} */}
                      <div className='custom-file'>
                        <input
                          type="button"
                          name='images'
                          className='custom-file-input'
                          id='customFile'
                          // on={ imgValidation.bind(this) }
                          onClick={imgValidation}

                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                          Choose Images
                        </label>
                      </div>

                      {/* { images.map(img => (
                      <img className="mt-3 mr-2" width="55" height="52" key={img._id} src={generatePublicUrl(img.img)} alt="Images Preview" />
                      ))}  */}
                    </div>
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="colors" className="label">choose colors</label>
                  <TwitterPicker name="colors" value={clrs.colors}
                    //  onChange={(e) => setPrice(e.target.value)} 
                    onChangeComplete={saveColors} />
                </div>
                <div className="form-group">
                  <Colors colors={clrs.colors} deleteColor={deleteColor} />
                </div>


                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                // disabled={loading ? true : false}
                >
                  CREATE
                </button>

              </form>
            </div>

          </Fragment>
        </div>
      </div>
      {renderDeleteCategoryModal()}
      {addCategorModal()}
    </Fragment>

  );
};