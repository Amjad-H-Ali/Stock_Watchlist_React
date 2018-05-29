import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="indices-header">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </header>

        <header className="app-header">
          <div className="watchlist-link nav">Watchlist</div>
          <div className="app-title">Foo Finance</div>
          <div className="sign-link nav">Sign In</div>
        </header>

        <div className="search-field">
          <input className="search-bar" type="search" placeholder="Search Ticker"/>
          <div className="search-icon"><i className="fa fa-search"></i></div>
        </div>

        <div className="app-body">
          <div className="watchlist-btn-container"><button className="add-to-watchlist-btn"></button></div>

          <div className="stock-info">
            <div><span className="stock-title">Apple Inc.</span> <span className="stock-ticker">(APPL)</span></div>
            <div><span className="stock-price">189.28</span> <span className="stock-percentage">1.14(0.61%)</span></div>
            <div><div className="market-cap-title">Market Cap</div> <div className="stock-market-cap">930.043 B</div></div>
          </div>

          <div></div>
        </div>  
       
      </div>
    );
  }
}

export default App;
