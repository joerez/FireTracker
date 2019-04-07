import React, { Component } from 'react';

class StatBox extends Component {
  constructor(props) {
    super(props);

    this.renderHover = this.renderHover.bind(this);
    this.showHint = this.showHint.bind(this);
    this.hideHint = this.hideHint.bind(this);
  }

  state = {
    hover: false,
    hide: false
  }

  showHint() {
    console.log('show')
    this.setState({hover: true, hide: false})
  }

  hideHint() {
    console.log('hide')

    this.setState({hide: true});
    this.hoverHide()
  }

  hoverHide() {
    setTimeout(() => {
      this.setState({hover: false})
    }, 300)
  }

  renderHover() {
    if (this.state.hover) {
      return (
        <div className={`stat-box-hint ${this.state.hide ? 'hide' : ''}`}>
          {this.props.hint}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="stats-container">
        {this.renderHover()}
        <div onMouseOver={() => this.showHint()} onMouseLeave={() => this.hideHint()} className="stats-icon">
          <i className={`blue fas fa-${this.props.icon}`}></i>
        </div>
        <div>
          <h3 className="stats-number">{this.props.value}</h3>
          <h3 className="stats-title">{this.props.title}</h3>
        </div>
      </div>

    )
  }
}

export default StatBox;
