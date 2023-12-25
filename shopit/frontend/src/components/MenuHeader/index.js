import React from 'react';
import './style.css';
import { useSelector,  } from 'react-redux';
// import { getAllCategory } from '../../actions';


/**
* @author
* @function MenuHeader
**/

const MenuHeader = () => {

  const category = useSelector(state => state.allCategories);
console.log('category menu',category)
  // const dispatch = useDispatch();


  const renderCategories = (categories) => {

    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.categoryImage}>
          {
            category.parentId ? <a
              href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
              {category.categoryImage}
            </a> :
            <span>{category.categoryImage}</span>
          }
          {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }
    return myCategories;
  }
  
  return (
    <div className="menuHeader">
      {/* <ul>
        {category.categories.length > 0 ? renderCategories(category.categories) : null}
      </ul> */}
    </div>
  )

}

export default MenuHeader