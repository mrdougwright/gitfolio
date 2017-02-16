import '../App.css';
import React, { Component } from 'react';
import base from '../config/firebase'
import api from '../config/githubAPI'
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
          this.setState({ username: user.login })
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

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>

    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Gitfolio</h2>
          <div className="logout">{logout}</div>
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
