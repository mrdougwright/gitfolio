import React from 'react'
import railsAPI from '../config/railsAPI'
import { browserHistory } from 'react-router'
import Repo from './Repo'


class ListRepos extends React.Component {
  constructor() {
    super()
    this.state = {
      username: null,
      repos: []
    }
  }

  goHome = () => { browserHistory.push('/') }

  componentDidMount(nextProps) {
    const username = this.props.params.githubUser
    this.setState({ username: username })
    railsAPI.getUserSnapshots(username)
      .then(repos => {
        this.setState({ repos: repos })
      })
  }

  render() {
    return (
      <div>
        <a className="fr f6 ma1 link dim br3 ph3 pv1 mb2 dib white bg-dark-blue" onClick={this.goHome}>Home</a>
        <h2 className="navy underline pb4">
          <a href={`https://github.com/${this.state.username}?tab=repositories`}>{this.state.username}</a>
        </h2>
        <ul className="mw7">
          {
            this.state.repos.map(repo => {
              return (
                <Repo
                  name={repo.name}
                  key={repo.url}
                  homepage={repo.url}
                  description={repo.desc}
                  username={this.state.username}
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ListRepos
