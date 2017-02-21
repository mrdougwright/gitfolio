import '../App.css';
import React, { Component } from 'react';
import ListRepos from './ListRepos'


class App extends Component {
  constructor() {
    super()
    this.state = {
      username: null
    }
  }

  componentDidMount() {
    this.setState({
      username: this.props.params.githubUser
    })
  }


  render() {
    return (
      <div>
        <div>
          <h2>Welcome to Gitfolio</h2>
        </div>
        <p className="">
          Your auto generated github portfolio.
          <span className="i fw1"> (Simply type a github handle in the url above)</span>
        </p>
        <ListRepos username={this.state.username} />
      </div>
    );
  }
}

export default App;
