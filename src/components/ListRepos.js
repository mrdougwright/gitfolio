import React from 'react'
import railsAPI from '../config/railsAPI'
import Repo from './Repo'


class ListRepos extends React.Component {
  constructor() {
    super()
    this.state = {
      repos: []
    }
  }

  componentWillReceiveProps(nextProps) {
    railsAPI.getUserSnapshots(nextProps.username)
      .then(repos => {
        this.setState({ repos: repos })
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
                key={repo.url}
                homepage={repo.url}
                description={repo.desc}
                username={this.props.username}
              />
            )
          })
        }
      </ul>
    )
  }
}

export default ListRepos
