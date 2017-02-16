import '../App.css';
import React, { Component } from 'react';
import base from '../config/firebase'

class App extends Component {
  componentDidMount() {
    base.syncState()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Gitfolio</h2>
        </div>
        <p className="App-intro">
          Your auto generated github portfolio.
        </p>
      </div>
    );
  }
}

export default App;
