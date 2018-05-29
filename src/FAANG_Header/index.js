import React from 'react';

const FAANG_Header = ({ FAANG }) => {

	const FAANGS = FAANG.map((stock, i) => {

		const {symbol, latestPrice, change, changePercent} = stock;

		


		return(
			<div className="FAANG-container" key={i}>
	            <div className="FAANG-title">{symbol}</div>
	            <div className="FAANG-price">{latestPrice}</div>
	        	<div className={change > 0 ? 'green FAANG-percentage' : 'red FAANG-percentage'}> {change}<span className="changePercent">({changePercent}%)</span> </div>
	        </div>
	    )    

	})

	return(
		<header className="FAANG-header">
			{FAANGS}
		</header> 

	) 
}


export default FAANG_Header;

