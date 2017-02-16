import '../App.css';
import React, { Component } from 'react';
import base from '../config/firebase'

class App extends Component {
  constructor() {
    super()
    this.state = {
      uid: null,
      owner: null
    }
  }


  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user })
      }
    })

    // base.syncState()
  }

  authenticate = (provider) => {
    console.log(`logging in with ${provider}`)
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler = (err, authData) => {
    if (err) { console.error(err); return; }

    const listRef = base.database().ref(this.props.params.githubUser)

    listRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}

      if(!data.owner) {
        listRef.set({ owner: authData.user.uid })
      }
      console.log(data)
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
        </div>
        <p className="App-intro">
          Your auto generated github portfolio.
        </p>
        <div className="logout">{logout}</div>
      </div>
    );
  }
}

export default App;
