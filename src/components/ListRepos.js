import React from 'react'
import api from '../config/githubAPI'


class ListRepos extends React.Component {
  constructor() {
    super()
    this.state = {
      repos: []
    }
  }

  componentWillReceiveProps(nextProps) {
    api.getRepos(nextProps.username)
      .then(repos => {
        this.setState({ repos: Array.from(repos) })
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.repos.map(repo => {
            return (
              <li key={Math.random()}>
                <span>{repo.name}</span>
                <span>{repo.homepage}</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default ListRepos
