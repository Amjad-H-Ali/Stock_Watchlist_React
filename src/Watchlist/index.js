import React from 'react';


const Watchlist = ({watchedStocks, deleteStock}) => {

	const stocks = watchedStocks.map((stock, i) => {
		const {symbol, companyName, latestPrice, iexBidPrice:bid, iexAskPrice:ask, change, changePercent, high, low, iexVolume:volume, latestTime} = stock;
		return (
			<div className='watchlist-row row' key={i}>
        <div className='bold'>{symbol}</div>
        <div>{companyName}</div>
        <div>{latestPrice}</div>
        <div>{bid}</div>
        <div>{ask}</div>
        <div className={change < 0 ? 'red' : 'green'}>{change} <span className='changePercent'>({changePercent})</span></div>
        <div>{high}</div>
        <div>{low}</div>
        <div>{volume}</div>
        <div>{latestTime}</div>
        <div className='x'><i id={symbol} onClick={deleteStock} className='fa fa-close'></i></div>
      </div>

		)
	});


	return (
		<div className='watchlist'>
          <div className='watchlist-title'> Watchlist </div>

          <div className='watchlist-rows'>
            <div className='watchlist-main-row row'>
              <div className='bold'>Symbol</div>
              <div>Name</div>
              <div>Price</div>
              <div>Bid</div>
              <div>Ask</div>
              <div>Change</div>
              <div>High</div>
              <div>Low</div>
              <div>Volume</div>
              <div>Updated</div>
              <div></div>
            </div>
            {stocks}
          </div>  
        </div>
        
	);

}



export default Watchlist;