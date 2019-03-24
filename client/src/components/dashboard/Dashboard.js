import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchUser } from '../../actions';
import Alert from '../alert/Alert';
import SideNav from '../sidenav/SideNav';

import FirstVisit from './firstVisit/FirstVisit';
import MainStats from './mainstats/MainStats';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updateDetails: this.props.auth.firstVisit,
      message: ''
    }

    this.detailsUpdated = this.detailsUpdated.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  renderError() {
    if (this.state.message) {
      return <Alert message={this.state.message} resetErrors={this.resetErrors}/>
    }
  }

  resetErrors() {
    this.setState({message: ''});
  }

  detailsUpdated(message) {
    this.setState({message: message})
  }

  toggleDetails() {
    if (this.state.updateDetails) {
      setTimeout(() => {
        this.props.fetchUser();
        this.setState({updateDetails: false});
      }, 150);
    } else {
      this.props.fetchUser();
      this.setState({updateDetails: true});
    }
  }

  renderUpdateDetails() {
    if (this.state.updateDetails) {
      return (
        <FirstVisit detailsUpdated={this.detailsUpdated} toggleDetails={this.toggleDetails} user={this.props.auth} />
      )
    }
  }

  render() {
    return (
      <div className="main">
        <SideNav />
        <div className="dashboard">
          {this.renderError()}
          {this.renderUpdateDetails()}

          <button className="absolute-settings-btn" onClick={this.toggleDetails}>Update details</button>

          <div className="dashboard-modules">
            <MainStats user={this.props.auth}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {fetchUser})(Dashboard);
