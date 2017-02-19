import '../App.css';
import React, { Component } from 'react';
import base from '../config/firebase'
import api from '../config/githubAPI'
import { browserHistory } from 'react-router'
import ListRepos from './ListRepos'


class App extends Component {
  constructor() {
    super()
    this.state = {
      uid: null,
      owner: null,
      username: null
    }
  }


  componentDidMount() {
    base.onAuth((user) => {
      if(user) { this.authHandler(null, { user }) }
    })
  }

  authenticate = (provider) => {
    console.log(`logging in with ${provider}`)
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler = (err, authData) => {
    if (err) { console.error(err); return; }
    const userRef = base.database().ref(this.props.params.githubUser)

    userRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}

      api.getUser(authData.user.providerData[0].uid)
        .then(user => {
          this.setState({ username: this.props.params.githubUser || user.login })
          browserHistory.push(`/${this.state.username}`)
        })

      if(!data.owner) {
        userRef.set({ owner: authData.user.uid })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  logout = () => {
    base.unauth()
    this.setState({ uid: null })
  }

  renderLogin = () => {
    return (
      <nav>
        <button className='github' onClick={() => this.authenticate('github')}>Login w/ Github</button>
      </nav>
    )
  }
//f6 link dim ph3 pv2 dib
  render() {
    const logout = <a className="f6 link ph3 pv2 br2 white dim hover-washed-yellow bg-navy" onClick={this.logout}>Log Out</a>

    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    return (
      <div className="App">
        <div className="App-header">
          <div className="logout fr">{logout}</div>
          <h2>Welcome to Gitfolio</h2>
        </div>
        <p className="App-intro">
          Your auto generated github portfolio.
        </p>
        <ListRepos username={this.state.username} />
      </div>
    );
  }
}

export default App;
