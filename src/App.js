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

    const signInJSON = await fetch('http://localhost:9292/user/login', {
      method:'POST',
      credentials: 'include',
      body: JSON.stringify({email: email, password: password})
    });

    const { success, message } = await signInJSON.json();


    success ?  this.setState({logged: true, modal:false}): this.setState({message: message});

  }

  signUp = async (email, password) => {
    const signUpJSON = await fetch('http://localhost:9292/user/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({email: email, password: password})
    });

    const { success, message } = await signUpJSON.json();

    success ? this.setState({logged: true, modal: false}) : this.setState({message: message});

  }

  getWatchedStocks = async () => {
   
    const {state:{logged}} = this;
  
    if (logged) {
      const stocksJSON = await fetch('http://localhost:9292/stock', {
        credentials: 'include'
      });
      
      const {stocks} = await stocksJSON.json();

      stocks.length > 0 ? this.getWatchedStocksInfo(stocks) : this.setState({watchlistShowing:true});
    }
    else {
      this.setState({modal: true, message:'You Must Be Logged In First!'});
    }
    
  }

  getWatchedStocksInfo = async (ticker) => {

    
    const stockInfoJSON = await fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote`);

    const objOfStocks = await stockInfoJSON.json();


    for(let key in objOfStocks) {

      const {watchedStocks, watchlistShowing} = this.state;

      const { quote: {symbol, companyName, latestPrice, iexBidPrice, iexAskPrice, change, changePercent, high, low, iexVolume, latestTime}} = objOfStocks[key];

      const percentified = this.percentify(changePercent);

      const stock = {symbol, companyName, latestPrice, iexBidPrice, iexAskPrice, change, changePercent:percentified, high, low, iexVolume, latestTime}

      // watchedStocks.push(stock);

      this.setState({watchedStocks:[...watchedStocks, stock],  watchlistShowing: true });
      

    }

    // this.setState({watchlistShowing: true });

  }

  logout = async (e) => {
    const logoutJSON = await fetch('http://localhost:9292/user/logout', {
      method:'POST',
      credentials:'include'
    });

    const {message} = await logoutJSON.json();
    
    this.setState({logged:false, watchlistShowing:false});

  }

  goHome = () => {

    this.setState({watchlistShowing:false});
  }

  addToWatchlist = async () => {

    const {logged} = this.state;
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

      const addStockJSON = await fetch(`http://localhost:9292/stock/${ticker}`, {
        method:'POST',
        credentials:'include'
      });

      const {added_stock} = await addStockJSON.json();

      this.getWatchedStocksInfo(added_stock);
    }
    else {
      this.setState({modal:true, message:'You Must Be Logged In First!'})
    } 


  }

  deleteStock = async (e) => {
    const ticker = e.target.id;
    
    const deleteJSON = await fetch(`http://localhost:9292/stock/${ticker}`, {
      method: 'DELETE',
      credentials:'include'
    })

    const {state:{watchedStocks}} = this;

    const newWatchedStocks = watchedStocks.filter(stock => stock.symbol !== ticker);

    this.setState({watchedStocks:newWatchedStocks});
  }

    
 


  render() {
    
    return (
      <div className="App">
        
        <FAANG_Header FAANG={this.state.FAANG}/>  

        <header className="app-header">
          {this.state.watchlistShowing ? <div onClick={this.goHome} className="left-nav-link nav">Home</div> : <div onClick={this.getWatchedStocks} className="left-nav-link nav">Watchlist</div> }
          <div className="app-title">Foo Finance</div>
          {this.state.logged ? <div onClick={this.logout} className="right-nav-link nav">Log Out</div> : <div onClick={this.showModal} className="right-nav-link nav">Sign In</div> }
        </header>
        
  
            

        {(this.state.watchlistShowing && this.state.logged) ? <Watchlist watchedStocks={this.state.watchedStocks} deleteStock={this.deleteStock} /> : <div> <Search getStock={this.getStock} /> <Stock stock={this.state.stock} AAPL={this.state.AAPL} addToWatchlist={this.addToWatchlist}/> </div>}

        {this.state.modal ? <Signin_Register showModal={this.showModal} signIn={this.signIn} signUp={this.signUp} message={this.state.message} /> : null}

      </div>
    );
  }
}

export default App;
/*

        */




/*




        <div id="myModal" class="modal">

          <div class="modal-content">
            <div class="modal-header">
              <span class="close">&times;</span>
              <h2 className="modal-title">Sign In</h2>
            </div>

            <div class="modal-body">
              <form className="sign-form">
                <div className="tabs"> <div className="sign-tab">Sign In</div> <div className="register-tab"> Register</div> </div>
                <div className="email-input-div"><div className="label">Email</div><input className="email-input" type="text" placeholder="Enter Your Email"/></div>
                <div className="password-input-div"><div className="label">Password</div><input className="password-input" type="text" placeholder="Enter Your Password"/></div>
                <div className="submit-btn-input-div"><button className="submit-btn">Sign In</button></div>
              </form>  
            </div>
          </div>
        </div> 
*/        
/*        <div className="search-field">
          <input className="search-bar" type="search" placeholder="Search Ticker"/>
          <div className="search-icon"><i className="fa fa-search"></i></div>
        </div>

        <div className="app-body">
          <div className="watchlist-btn-container"><button className="add-to-watchlist-btn">Watch<i className="fa fa-angle-right"></i></button></div>

          <div className="stock-info">
            <div><span className="stock-title">Apple Inc.</span> <span className="stock-ticker">(APPL)</span></div>
            <div><span className="stock-price">189.28</span> <span className="stock-percentage">1.14(0.61%)</span></div>
            <div><div className="market-cap-title">Market Cap</div> <div className="stock-market-cap">930.043 B</div></div>
          </div>

          <div></div>
        </div> 
*/        

