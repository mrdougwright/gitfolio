import React from 'react'
import githubApi from '../config/githubAPI'
import Repo from './Repo'


class ListRepos extends React.Component {
  constructor() {
    super()
    this.state = {
      repos: []
    }
  }

  componentWillReceiveProps(nextProps) {
    githubApi.getRepos(nextProps.username)
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
              <Repo
                name={repo.name}
                key={repo.homepage}
                homepage={repo.homepage}
                description={repo.description}
              />
            )
          })
        }
      </ul>
    )
  }
}

export default ListRepos
