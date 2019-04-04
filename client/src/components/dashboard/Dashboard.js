import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchUser } from '../../actions';
import Alert from '../alert/Alert';
import SideNav from '../sidenav/SideNav';

import FirstVisit from './firstVisit/FirstVisit';
import MainStats from './mainstats/MainStats';
import Graph from './mainstats/Graph';
import { managerData, yearLabels } from "./mockData";


class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updateDetails: this.props.auth.firstVisit,
      message: '',
      data: managerData,
      labels: yearLabels
    }



    this.detailsUpdated = this.detailsUpdated.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
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
        this.props.getUser();
        this.setState({updateDetails: false});
      }, 150);
    } else {
      this.props.getUser();
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


          <div className="dashboard-modules">
            <div className="module-header">
              <h3 className="dash-title">Finances Overview</h3>
              <button className="absolute-settings-btn" onClick={this.toggleDetails}>Update details <i className="gray-carrot fas fa-user-cog"></i></button>
            </div>
            <MainStats user={this.props.auth}/>

            <Graph auth={this.props.auth} getUser={this.props.getUser} data={this.state.data} label={this.state.labels} />


            <img className="fake-img" width="99.8%" src="https://i.ibb.co/3zCsYyY/Screen-Shot-2019-03-26-at-6-09-35-PM.png" />

          </div>

        </div>
      </div>
    )
  }
}

// function mapStateToProps({ auth }) {
//   return { auth };
// }
//
// export default connect(mapStateToProps, {fetchUser})(Dashboard);

export default Dashboard;
