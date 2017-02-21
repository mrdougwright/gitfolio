import '../App.css';
import React, { Component } from 'react';
import { browserHistory } from 'react-router'


class App extends Component {

  gotoHandle = () => {
    const username = document.getElementById('handle').value
    browserHistory.push(`/${username}`)
  }

  render() {
    return (
      <div>
        <div>
          <h2>Welcome to Gitfolio</h2>
        </div>
        <p>
          Your auto generated github portfolio.
        </p>
        <input type="text" id="handle" placeholder="github handle" />
        <a className="f6 ma1 link dim br3 ph3 pv1 mb2 dib white bg-dark-blue" onClick={this.gotoHandle}>View Portfolio</a>
      </div>
    );
  }
}

export default App;
