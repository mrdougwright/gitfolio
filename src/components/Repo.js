import React from 'react'


class Repo extends React.Component {
  constructor() {
    super()
    this.state = {
      image: null
    }
  }



  render() {
    return (
      <a href={this.props.homepage} target="_blank">
        <li className="bg-hot-pink ma2 pa3 pa4-ns grow br2">
          <b className="washed-yellow db f3 mb1">{this.props.name}</b>
          <p>{this.props.description}</p>
          <img className="fr" src={this.state.image} alt={this.props.name} />
        </li>
      </a>
    )
  }
}

export default Repo
