import React, { Component } from 'react';
import './App.css';
import FAANG_Header from './FAANG_Header';
import Search from './Search';
import Stock from './Stock';
import Signin_Register from './Signin_Register'

class App extends Component {
  constructor() {
    super();
    this.state = {
      FAANG: [],
      AAPL: {},
      stock: {},
      modal: false,
      logged: false,
      message: ""


      
    };
  }
  componentDidMount () {
    const tickersFAANG = ['FB', 'AMZN', 'AAPL', 'NFLX', 'GOOG'];

    tickersFAANG.forEach(ticker => this.getFAANG(ticker));
    
  }

  percentify = (num) => {

    return (num*100).toFixed(2);

  }

  getFAANG = async (ticker) => {
    const FAANGJSON = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/book`);

    const {quote:{companyName, symbol, latestPrice, change, changePercent, marketCap}} = await FAANGJSON.json();

    const percentified = this.percentify(changePercent);

    const stock = {companyName, symbol, latestPrice, change, changePercent:percentified, marketCap};
  
    const {state:{FAANG}} = this;

    if (stock.symbol === 'AAPL') {
      this.setState({AAPL:stock})
    }

    this.setState({FAANG:[...FAANG, stock]});

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
    const signInJSON = await fetch('https://localhost:9292/user/login', {
      method:'POST',
      credentials: 'include',
      body: JSON.stringify({email: email, password: password})
    });

    const { success, message } = await signInJSON.json();

    success ? this.setState({logged: true}) : this.setState({message: message});

  }

  signUp = async (email, password) => {
    const signUpJSON = await fetch('https://localhost:9292/user/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({email: email, password: password})
    });

    const { success, message } = await signUpJSON.json();

    success ? this.setState({logged: true}) : this.setState({message: message});

  }


  render() {
    return (
      <div className="App">
        
       <FAANG_Header FAANG={this.state.FAANG}/>  

        <header className="app-header">
          <div className="watchlist-link nav">Watchlist</div>
          <div className="app-title">Foo Finance</div>
          <div onClick={this.showModal} className="sign-link nav">Sign In</div>
        </header>


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
            <div className='watchlist-row row'>
              <div className='bold'>AAPL</div>
              <div>Apple Inc</div>
              <div>187.45</div>
              <div>187.45</div>
              <div>187.45</div>
              <div>27.30</div>
              <div>187.45</div>
              <div>187.34</div>
              <div>1234458838</div>
              <div>1:32:34 EST</div>
              <div className='x'><i className='fa fa-close'></i></div>
            </div>
            <div className='watchlist-row row'>
              <div className='bold'>AAPL</div>
              <div>Apple Inc</div>
              <div>187.45</div>
              <div>187.45</div>
              <div>187.45</div>
              <div>27.30</div>
              <div>187.45</div>
              <div>187.34</div>
              <div>1234458838</div>
              <div>1:32:34 EST</div>
              <div className='x'>X</div>
            </div>
            <div className='watchlist-row row'>
              <div className='bold'>AAPL</div>
              <div>Apple Inc</div>
              <div>187.45</div>
              <div>187.45</div>
              <div>187.45</div>
              <div >27.30</div>
              <div>187.45</div>
              <div>187.34</div>
              <div>1234458838</div>
              <div>1:32:34 EST</div>
              <div className='x'>X</div>
            </div>
          </div>
        </div>  
        
        
          

        {this.state.modal ? <Signin_Register showModal={this.showModal} signIn={this.signIn} signUp={this.signUp} /> : null}

      </div>
    );
  }
}

export default App;
/*
<Search getStock={this.getStock} />

        <Stock stock={this.state.stock} AAPL={this.state.AAPL}/>
        */




/*<div className="body-header">
   Welcome John
  </div>




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

