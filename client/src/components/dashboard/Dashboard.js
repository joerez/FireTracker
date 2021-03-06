import React, { Component } from 'react';

import Alert from '../alert/Alert';
import SideNav from '../sidenav/SideNav';

import FirstVisit from './firstVisit/FirstVisit';
import MainStats from './mainstats/MainStats';
import MonthlyStatisticsChart from './mainstats/MonthlyStatisticsChart';
import DebtChart from './mainstats/DebtChart';
import NoDebt from './mainstats/NoDebt';
import SavingSpendingChart from './mainstats/SavingSpendingChart';
import YearlyCompoundBars from './mainstats/YearlyCompoundBars';

class Dashboard extends Component {
  constructor(props) {
    super(props)

      this.state = {
        updateDetails: this.props.auth.firstVisit,
        message: '',
        debtFree: false
      }

    this.detailsUpdated = this.detailsUpdated.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
    this.updateDebt = this.updateDebt.bind(this);
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

  updateDebt() {
    if (!this.props.auth.currentDebt === 0) {
      this.setState({debtFree: false})
    }
  }

  renderUserDash() {

    if (this.props.auth.email) {
      return (
        <div>
          <MainStats user={this.props.auth}/>
          <div className="horizontal-charts">
            <SavingSpendingChart auth={this.props.auth} />
            {this.props.auth.currentDebt === 0 ? <NoDebt /> : <DebtChart auth={this.props.auth} /> }
            <YearlyCompoundBars getUser={this.props.getUser} auth={this.props.auth} />
            <MonthlyStatisticsChart auth={this.props.auth} getUser={this.props.getUser}/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Please update more details to see statistics!
        </div>
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
          {
            this.updateDebt()
          }


          <div className="dashboard-modules">
            <div className="module-header">
              <h3 className="dash-title">Finances Overview</h3>
              <button className="absolute-settings-btn" onClick={this.toggleDetails}>Update details <i className="gray-carrot fas fa-user-cog"></i></button>
            </div>

            {this.renderUserDash()}

            <img className="fake-img" alt="fake" width="99.8%" src="https://i.ibb.co/3zCsYyY/Screen-Shot-2019-03-26-at-6-09-35-PM.png" />

          </div>

        </div>
      </div>
    )
  }
}

export default Dashboard;
