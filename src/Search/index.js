import React from 'react';


const Search = ({getStock}) => {


	return(
	
		<div className="search-field">
          <input className="search-bar" onKeyDown={getStock} type="search" placeholder="Search Ticker"/>
          <div className="search-icon"><i onClick={getStock} className="fa fa-search"></i></div>
        </div>


	)
}

export default Search;