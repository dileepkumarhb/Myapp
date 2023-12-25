import React from 'react';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import { Row, Col } from 'react-bootstrap';


const AddCategoryModal = (props) => {

    const {
        show,
        handleclose,
        modalTitle,
        categoryName,
        handleInput,
        parentCategoryId,
        categoryList,
        categoryImage,
        handleInputImage,
        onSubmit
     } = props;

    return (
        <Modal
            show={show}
            handleclose={handleclose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        type='text'
                        name="categoryName"
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => handleInput(e)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                     <select
                        name="parentCategoryId"
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => handleInput(e)}
                        >
                        <option>select category</option>
                        { console.log('categoryList',categoryList)}
                        {
                            
                            categoryList.map(option =>
                               
                                <option key={option.value} value={option.value}>{option.categoryName}</option>)
                        }
                    </select> 
                </Col>
            </Row>
            <Row>
                <Col>
                  <Input
                        type="file"
                        name="categoryImage"
                        value={categoryImage}
                        placeholder={`Category Name`}
                        onChange={(e) => handleInputImage(e)}
                        className="form-control-sm"
                        accept="image/*"
                    /> 
                </Col>
            </Row>
        </Modal>
    );
}

export default AddCategoryModal;