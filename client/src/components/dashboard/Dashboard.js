import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchUser } from '../../actions';
import Alert from '../alert/Alert';

import FirstVisit from './firstVisit/FirstVisit';


class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updateDetails: this.props.auth.firstVisit,
      message: ''
    }

    this.detailsUpdated = this.detailsUpdated.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  renderError() {
    if (this.state.message) {
      return <Alert message={this.state.message} />
    }
  }

  detailsUpdated(message) {
    this.setState({updateDetails: false, message: message})
  }

  toggleDetails() {
    this.setState({updateDetails: !this.state.updateDetails});
  }

  renderUpdateDetails() {
    if (this.state.updateDetails) {
      return (
        <FirstVisit detailsUpdated={this.detailsUpdated} toggleDetails={this.toggleDetails} />
      )
    }
  }

  render() {
    return (
      <div className="dashboard">
        {this.renderError()}
        {this.renderUpdateDetails()}

        <button onClick={this.toggleDetails}>Update details</button>

      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {fetchUser})(Dashboard);
