import React, { useState, useEffect, Fragment } from 'react';
import Modal from '../UI/Modal';
// import Layout from '../Layout';
import Input from '../UI/Input';
import Sidebar from '../admin/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import linearCategories from '../utils/linearCategories';
import { useSelector, useDispatch } from 'react-redux';
import { createBanner } from '../../actions/bannerAction';

/**
* @author
* @function NewBanner
**/

const NewBanner = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const banner = useSelector(state => state.banner);
    const category = useSelector(state => state.allCategories);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    useEffect(() => {
        // console.log(banner);
        if(!banner.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [banner]);

    const onCategoryChange = (e) => {
        const categoryType = categories.find(category => category.value === e.target.value);
        setCategoryId(e.target.value);
        setType(categoryType.type);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm = (e) => {
        //e.target.preventDefault();

        if(title === ""){
            alert('Title is required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        console.log({title, desc, categoryId, type, banners, products});
        dispatch(createBanner(form));

        
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New banner'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col lg={12} md={10}>
                            {/* <select
                                className="form-control"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select> */}
                            <Input 
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder={'Select Category'}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'banner Title'}
                                className=""
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'banner Desc'}
                                className=""
                            />
                        </Col>
                    </Row>

                    {
                            banners.length > 0 ? 
                            banners.map((banner, index) => 
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control" 
                                type="file" 
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>

                    {
                            products.length > 0 ? 
                            products.map((product, index) => 
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                        }
                    <Row>
                        <Col>
                            <Input 
                                className="form-control"
                                type="file" 
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>

                    

                </Container>


            </Modal>
        );
    }


    return (
        // <Layout sidebar>
            // {
            //     banner.loading ? 
            //     <p>Creating Page...please wait</p>
            //     :
            //     <>
            //     <h1>create banner</h1>
            <Fragment>
               <Row>
                    <div className="col-12 col-md-2">
                    <Sidebar />
                    </div>
                    <Col md={10}>
                    {renderCreatePageModal()}
                    <button onClick={() => setCreateModal(true)}>Create Page</button>
                    </Col>
                </Row>  
            </Fragment>
            
            //     </>
            // }
            
        // </Layout>
    )

}

export default NewBanner