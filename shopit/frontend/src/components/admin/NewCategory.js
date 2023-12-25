import React, { Fragment, useState, useEffect } from 'react';
//import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import {
    getAllCategory,
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions/categoryActions';
import store from '../../store'
// import { getInitialData } from "../../actions/initialDataAction";
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree'
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './AddCategoryModal';
import Sidebar from './Sidebar';
import './style.css';

const NewCategory = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category = useSelector(state => state.allCategories)


useEffect(()=>{
    dispatch(getAllCategory())
 },[])

    // const [categoryName, setCategoryName] = useState('');
    // const [parentCategoryId, setParentCategoryId] = useState('');
    // const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    //handle close
    const [addCategories, setaddCategory] = useState({
        categoryName: "", parentCategoryId: "", categoryImage: "",
    });


    console.log('addCategories',addCategories)
    const handleInputImage = (e) => {    
        setaddCategory({ ...addCategories, categoryImage: e.target.files[0] })
    }
    const handleInput = (e) => {
        setaddCategory({ ...addCategories, [e.target.name]: e.target.value })
    }
    const handleclose = () => {
    if (addCategories.categoryName === "") {
        alert('Category name is required');
        setShow(true);
        return;
    };

        dispatch(addCategory(addCategories));
        setaddCategory('')
        setShow(false);
        
    }
    
  
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.categoryName,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
      
        return myCategories;
    }

    //linear list
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                categoryName: category.categoryName,
                parentCategoryId: category.parentCategoryId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const categoryList = createCategoryList(category.categories);
    const updateCategory = () => {
        setUpdateCategoryModal(true);
        updateCheckedAndExpandedCategories(); 
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category);
        })
       
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
           
                setaddCategory(updatedCheckedArray)
                setCheckedArray(updatedCheckedArray);

        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
                setaddCategory(updatedExpandedArray)
                setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
 
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            // dbJson={

            // }
       
            // setaddCategory({_id:item.value,categoryName:item.categoryName,
            //     parentCategoryId:item.parentCategoryId ? item.parentCategoryId : "",
            //     type:item.type})
            form.append('_id', item.value);
            form.append('categoryName', item.categoryName);
            form.append('parentCategoryId', item.parentCategoryId ? item.parentCategoryId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
           
            // setaddCategory({_id:item.value,categoryName:item.categoryName,
            //     parentCategoryId:item.parentCategoryId ? item.parentCategoryId : "",
            //     type:item.type})
            form.append('_id', item.value);
            form.append('categoryName', item.categoryName);
            form.append('parentCategoryId', item.parentCategoryId ? item.parentCategoryId : "");
            form.append('type', item.type);
        });
        
        dispatch(updateCategories(form)).then(result => {
            if (result) {
                dispatch(getAllCategory())
                setUpdateCategoryModal(false)
            }
        });
    }
   
    const deleteCategories = () => { 
        
        let checkedIdsArray = checkedArray.map((item) => (item.value));
        const expandedIdsArray = expandedArray.map((item) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
       
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }
        setDeleteCategoryModal(false)
    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleclose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Expanded</h5>
                {expandedArray.map((item, index) => <span key={index}>{item.categoryName}</span>)}
                <h5>Checked</h5>
                {checkedArray.map((item, index) => <span key={index}>{item.categoryName}</span>)}

            </Modal>
        );
    }


    return (
        <Fragment>
            <Row>
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div lg={12} md={10}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Category</h3>
                        <div className="actionBtnContainer">
                            <span>Actions: </span>
                          
                            <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                            
                            <button onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
                            
                            <button ><IoIosCloudUpload onClick={updateCategory} /> <span>Edit</span></button>
                        </div>

                    </div>

                </div>
                <Row>
                    <Col md={12}>
                   
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Row>
            <Container>
            </Container>
            <AddCategoryModal
                show={show}
                handleclose={() => setShow(false)}
                onSubmit={handleclose}
                modalTitle={'Add New Category'}
                handleInput={handleInput}
                handleInputImage={handleInputImage}
                categoryName={addCategories.categoryName}
                // categoryImage={addCategories.categoryImage}
                parentCategoryId={addCategories.parentCategoryId}
                categoryList={categoryList}
            // handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleclose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {renderDeleteCategoryModal()}
        </Fragment>
    )
}

export default NewCategory