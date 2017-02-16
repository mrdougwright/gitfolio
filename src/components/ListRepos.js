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
        const filteredRepos = repos.filter(r => r.homepage)
        this.setState({ repos: filteredRepos })
      })
  }

  render() {
    return (
      <ul className="mw7">
        {
          this.state.repos.map(repo => {
            return (
              <a href={repo.homepage} target="_blank">
                <li className="bg-hot-pink ma2 pa3 pa4-ns grow br2" key={repo.homepage}>
                  <b className="washed-yellow db f3 mb1">{repo.name}</b>
                  <p>{repo.description}</p>
                  <img src={'meh'} alt={repo.name} />
                </li>
              </a>
            )
          })
        }
      </ul>
    )
  }
}

export default ListRepos
