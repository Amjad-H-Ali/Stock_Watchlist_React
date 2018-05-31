import React from 'react';


const Stock = ({stock, AAPL, addToWatchlist}) => {

	let companyName, symbol, latestPrice, change, changePercent, marketCap;

	if (Object.keys(stock).length === 0) {

		({companyName, symbol, latestPrice, change, changePercent, marketCap} = AAPL);
	}
	else {
		({companyName, symbol, latestPrice, change, changePercent, marketCap} = stock);
	}

	

	return(

		<div className="app-body">
          <div className="watchlist-btn-container"><button onClick={addToWatchlist} className="add-to-watchlist-btn">Watch<i className="fa fa-angle-right"></i></button></div>

          <div className="stock-info">
            <div><span className="stock-title">{companyName}</span> <span className="stock-ticker">({symbol})</span></div>
            <div><span className="stock-price">{latestPrice}</span> <span className={change < 0 ? "stock-percentage red" : "stock-percentage green" }>{change}<span className="changePercent">({changePercent})</span></span></div>
            <div><div className="market-cap-title">Market Cap</div> <div className="stock-market-cap">{marketCap}</div></div>
          </div>

          <div></div>
        </div>

	)

}

export default Stock;