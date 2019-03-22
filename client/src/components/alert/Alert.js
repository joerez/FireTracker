import React, { Component } from 'react';

import './alert.css';

class Alert extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: 'flex',
      fadeOutMs: 3000
    }
  }

  componentDidMount() {
    this.alertExit();
  }

  alertExit() {
    setTimeout(() => {
      this.setState({display: 'none'})
    }, this.state.fadeOutMs)
  }

  render() {
    return (
      <div className="alert" style={{display: this.state.display}}>{this.props.message}</div>
    )
  }
}

export default Alert;
