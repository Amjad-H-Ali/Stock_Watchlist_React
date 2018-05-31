import React from 'react';


const Watchlist = ({watchedStocks}) => {

	const stocks = watchedStocks.map(stock => {
		const {symbol, companyName, latestPrice, bid, ask, change, high, low, volume, latestTime} = stock;
		return (
			<div className='watchlist-row row'>
              <div className='bold'>{symbol}</div>
              <div>{companyName}</div>
              <div>{latestPrice}</div>
              <div>{bid}</div>
              <div>{ask}</div>
              <div className={change < 0 ? 'red' : 'green'}>{change}</div>
              <div>{high}</div>
              <div>{low}</div>
              <div>{volume}</div>
              <div>{latestTime}</div>
              <div className='x'><i className='fa fa-close'></i></div>
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