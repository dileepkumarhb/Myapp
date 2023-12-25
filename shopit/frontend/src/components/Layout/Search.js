import React, { useState } from "react";
import { useNavigate } from "react-router";

const Search = () => {

  const [keyword, setKeyword] = useState('');

  let navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <i className="fa fa-search input-group-append search_btn" id="search_btn" aria-hidden="true"></i>
        {/* <div className="input-group-append">
          <button id="search_btn" className="btn"> */}
            
          {/* </button>
        </div> */}
      </div>
    </form>
  )
}

export default Search