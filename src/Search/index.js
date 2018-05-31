import React, { Component } from 'react';


class Search extends Component {

	constructor() {
		super();

		this.state = {
			inputValue:''
		};
	}

	handleInput = (e) => {

		this.setState({inputValue:e.target.value})
		console.log(this.state);
	}

	whichKey = (e) => {

		const {state:{inputValue}, props:{getStock}} = this;

		if (e.which === 13) {
			getStock(inputValue);
		}
	}
	

	render() {
		return(
		
			<div className="search-field">
	          <input className="search-bar" value={this.state.inputValue} onKeyDown={this.whichKey} onChange={this.handleInput} type="search" placeholder="Search Ticker"/>
	          <div className="search-icon"><i onClick={this.props.getStock.bind(null, this.state.inputValue)} className="fa fa-search"></i></div>
	        </div>
		)
	}	
}

export default Search;