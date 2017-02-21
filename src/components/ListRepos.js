import React from 'react'
import railsAPI from '../config/railsAPI'
import { browserHistory } from 'react-router'
import Repo from './Repo'


class ListRepos extends React.Component {
  constructor() {
    super()
    this.state = {
      username: null,
      disabled: false,
      color: null,
      repos: []
    }
  }

  componentDidMount(nextProps) {
    const username = this.props.params.githubUser
    const color = this.props.params.color
    this.setState({
      username: username,
      color: color || 'gold'
    })
    railsAPI.getUserSnapshots(username)
      .then(repos => {
        this.setState({ repos: repos })
      })
  }

  goHome = () => { browserHistory.push('/') }

  updateUserRepos = () => {
    this.setState({ disabled: true })
    railsAPI.updateRepos(this.state.username)
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
                  key={repo.url}
                  name={repo.name}
                  homepage={repo.url}
                  description={repo.desc}
                  color={this.state.color}
                  username={this.state.username}
                />
              )
            })
          }
        </ul>
        <p>Note that images may take a while to load for the first request. Need to update this info?</p>
        <button className="f6 ma1 link dim br3 ph3 pv1 mb2 dib white bg-dark-blue" onClick={this.updateUserRepos} disabled={this.state.disabled}>Update my info</button>
      </div>
    )
  }
}

export default ListRepos
