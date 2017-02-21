import React from 'react'
import railsAPI from '../config/railsAPI'


class Repo extends React.Component {
  constructor() {
    super()
    this.state = {
      image: null
    }
  }

  componentDidMount() {
    railsAPI.getRepoImage(this.props.username, this.props.name)
      .then(repo => {
        this.setState({ image: repo.image_url })
      })
  }


  render() {
    return (
      <a href={this.props.homepage} target="_blank">
        <li className="bg-hot-pink ma2 pa3 pa4-ns grow br2">
          <b className="washed-yellow db f3 mb1">{this.props.name}</b>
          <p>{this.props.description}</p>
          <div className="w-80 center">
            <img className="w-100" src={this.state.image} alt={this.props.name} />
          </div>
        </li>
      </a>
    )
  }
}

export default Repo
