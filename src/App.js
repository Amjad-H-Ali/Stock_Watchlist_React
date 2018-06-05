import React, { Component } from 'react';
import './App.css';
import FAANG_Header from './FAANG_Header';
import Search from './Search';
import Stock from './Stock';
import Signin_Register from './Signin_Register'
import Watchlist from './Watchlist';

class App extends Component {
  constructor() {
    super();
    this.state = {
      FAANG: [],
      AAPL: {},
      stock: {},
      modal: false,
      logged: false,
      message: "",
      watchedTickers:[],
      watchedStocks: [],
      watchlistShowing:false,
      


      
    };
  }
  componentDidMount () {
    this.getFAANG('FB', 'AMZN', 'AAPL', 'NFLX', 'GOOG');

    const {state:{logged}} = this;
  }

  // convert decimal multiplier to percent
  percentify = (num) => {

    return (num*100).toFixed(2);

  }

  getFAANG = async (...ticker) => {
    
    // get stock info for the five default stocks
    const FAANGJSON = await fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote`) 
    const ObjFAANG = await FAANGJSON.json();

    // loop over objfaang and .....
    for (let key in ObjFAANG) { 

      // create variable FAANG that references FAANG in this.state
      const {state:{FAANG}} = this; 

      // create variables companyName, symbol, etc for this stock in objFaang
      const {quote:{companyName, symbol, latestPrice, change, changePercent, marketCap}} = ObjFAANG[key];

      const percentified = this.percentify(changePercent);

      const stock = {companyName, symbol, latestPrice, change, changePercent:percentified, marketCap};

      if (key === 'AAPL') {
        this.setState({AAPL:stock})
      }

      this.setState({FAANG:[...FAANG, stock]});
    }
    
  }




  getStock = async (ticker) => {
    
    
    const stockJSON = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/book`);

    const {quote:{companyName, symbol, latestPrice, change, changePercent, marketCap}} = await stockJSON.json();

    const percentified = this.percentify(changePercent);

    this.setState({stock:{companyName, symbol, latestPrice, change, changePercent:percentified, marketCap}, showStock:true });
   
  }

  showModal = (e) => {
    const {state:{modal}} = this;

    modal ? this.setState({modal:false}) : this.setState({modal:true})

  }

  signIn = async (email, password) => {

    const signInJSON = await fetch('https://peaceful-chamber-98522.herokuapp.com/user/login', {
      method:'POST',
      credentials: 'include',
      body: JSON.stringify({email: email, password: password})
    });

    const { success, message } = await signInJSON.json();


    success ?  (this.setState({logged: true, modal:false}), this.getWatchedTickers()) : this.setState({message: message});

  }

  signUp = async (email, password) => {
    const signUpJSON = await fetch('https://peaceful-chamber-98522.herokuapp.com/user/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({email: email, password: password})
    });

    const { success, message } = await signUpJSON.json();

    success ? (this.setState({logged: true, modal: false}), this.getWatchedTickers()): this.setState({message: message});

  }

  getWatchedTickers = async () => {

  
    const stocksJSON = await fetch('https://peaceful-chamber-98522.herokuapp.com/stock', {
      credentials: 'include'
    });
    
    const {stocks} = await stocksJSON.json();

    this.setState({watchedTickers:stocks});
   
    
  }

  getWatchedStocksInfo = async () => {

    const {state:{watchedTickers:tickers, watchedStocks, watchlistShowing, logged}} = this;

    if (tickers.length > 0 && logged) {
      const stockInfoJSON = await fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote`);

      const objOfStocks = await stockInfoJSON.json();

      this.addWatchedStockInfo(objOfStocks);
    }
    else if (logged) {
      this.setState({watchlistShowing:true});
    }
    else {
      this.setState({modal: true, message:'You Must Be Logged In First!'});

    }

  }

  addWatchedStockInfo = (obj) => {

    const {state:{watchlistShowing}} = this;

    for(let key in obj) {

      const {state:{watchedStocks}} = this;

      const { quote: {symbol, companyName, latestPrice, iexBidPrice, iexAskPrice, change, changePercent, high, low, iexVolume, latestTime}} = obj[key];

      const percentified = this.percentify(changePercent);

      const stock = {symbol, companyName, latestPrice, iexBidPrice, iexAskPrice, change, changePercent:percentified, high, low, iexVolume, latestTime}
        
        this.setState({watchedStocks:[...watchedStocks, stock]});
       
    }

    this.setState({watchlistShowing:true});
  }


  logout = async (e) => {
    const logoutJSON = await fetch('https://peaceful-chamber-98522.herokuapp.com/user/logout', {
      method:'POST',
      credentials:'include'
    });

    const {message} = await logoutJSON.json();
    
    this.setState({logged:false, watchlistShowing:false, watchedStocks:[], watchedTickers:[]});

  }

  goHome = () => {

    this.setState({watchlistShowing:false, watchedStocks:[]});
  }

  addToWatchlist = async () => {

    const {logged, watchedTickers} = this.state;
    if (logged) {
      let ticker;

      const {stock, AAPL} = this.state;

      // if we just did a search
      if (stock['symbol']) {
        ({symbol:ticker} = stock);
      }
      // this.state.stock is still an empty object so use apple by default
      else {
        ({symbol:ticker} = AAPL);
      }

      const addStockJSON = await fetch(`https://peaceful-chamber-98522.herokuapp.com/stock/${ticker}`, {
        method:'POST',
        credentials:'include'
      });

      const {added_stock} = await addStockJSON.json();

      this.setState({watchedTickers:[...watchedTickers, added_stock]});

      this.getWatchedStocksInfo();
    }
    else {
      this.setState({modal:true, message:'You Must Be Logged In First!'})
    } 


  }

  deleteStock = async (e) => {
    const ticker = e.target.id;
    
    const deleteJSON = await fetch(`https://peaceful-chamber-98522.herokuapp.com/stock/${ticker}`, {
      method: 'DELETE',
      credentials:'include'
    })

    const {state:{watchedTickers, watchedStocks}} = this;

    const newWatchedStocks = watchedStocks.filter(stock => stock.symbol !== ticker);

    const newWatchedTickers = watchedTickers.filter(aTicker => aTicker !== ticker);

    this.setState({watchedTickers:newWatchedTickers, watchedStocks:newWatchedStocks});
  }

    
 


  render() {
    
    return (
      <div className="App">
        
        <FAANG_Header FAANG={this.state.FAANG}/>  

        <header className="app-header">
          {this.state.watchlistShowing ? <div onClick={this.goHome} className="left-nav-link nav">Home</div> : <div onClick={this.getWatchedStocksInfo} className="left-nav-link nav">Watchlist</div> }
          <div className="app-title">FINVESTOR</div>
          {this.state.logged ? <div onClick={this.logout} className="right-nav-link nav">Log Out</div> : <div onClick={this.showModal} className="right-nav-link nav">Sign In</div> }
        </header>
        
  
            

        {(this.state.watchlistShowing && this.state.logged) ? <Watchlist watchedStocks={this.state.watchedStocks} deleteStock={this.deleteStock} /> : <div> <Search getStock={this.getStock} /> <Stock stock={this.state.stock} AAPL={this.state.AAPL} addToWatchlist={this.addToWatchlist}/> </div>}

        {this.state.modal ? <Signin_Register showModal={this.showModal} signIn={this.signIn} signUp={this.signUp} message={this.state.message} /> : null}

      </div>
    );
  }
}

export default App;
        

