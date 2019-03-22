import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchUser } from '../../actions';


import FirstVisit from './firstVisit/FirstVisit';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updateDetails: this.props.auth.firstVisit,
      message: ''
    }

    this.detailsUpdated = this.detailsUpdated.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  renderError() {
    if (this.state.message) {
      return <div>{this.state.message}</div>
    }
  }

  detailsUpdated(message) {
    this.setState({updateDetails: false, message: message})
  }

  renderFields() {
    if (this.state.updateDetails) {
      return (
        <FirstVisit detailsUpdated={this.detailsUpdated}/>
      )
    }
  }

  render() {
    return (
      <div className="dashboard">
        {this.renderError()}
        {this.renderFields()}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {fetchUser})(Dashboard);
