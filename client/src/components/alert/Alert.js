import React, { Component } from 'react';

import './alert.scss';

class Alert extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: 'flex',
      fadeOutMs: 3000
    }

    this.alertExit = this.alertExit.bind(this);
    this.exitInstantly = this.exitInstantly.bind(this);
  }

  componentDidMount() {
    this.alertExit();
  }

  alertExit() {
    setTimeout(() => {
      this.props.resetErrors();
      this.setState({display: 'none'})
    }, this.state.fadeOutMs)
  }

  exitInstantly() {
    this.props.resetErrors();
    this.setState({display: 'none'})
  }

  render() {
    return (
      <div className="alert" onClick={this.exitInstantly} style={{display: this.state.display}}>{this.props.message}</div>
    )
  }
}

export default Alert;
