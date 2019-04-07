import React, { Component } from 'react';

import compound from 'compound-interest';

import './MainStats.scss';


class MainStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monthlySavingsData: []
    }

    this.getRetirementNetworth = this.getRetirementNetworth.bind(this);
    this.getMonthlyIncome = this.getMonthlyIncome.bind(this);
  }

  getTotalNetworth() {
    const user = this.props.user;
    const totalNetworth = user.totalSavings + user.totalInvested;


    if (totalNetworth) {
      return this.addCommas(totalNetworth);
    }

    return 'Account not set up'
  }

  getRetirementNetworth() {
    const user = this.props.user;
    const currentYear = new Date().getFullYear()

    if (user.desiredRetirementAge && user.birthYear && user.totalInvested && user.monthlyInvested) {
      const opts = {
        initial: parseInt(user.totalInvested),  // initial balance
        monthly: parseInt(user.monthlyInvested),   // monthly addition
        interest: 8,    // +% interest
        compound: 1,   // compounding factor (1, 12, 365...)
        years: parseInt(user.desiredRetirementAge - (currentYear - user.birthYear))
      };

      let total = compound(opts); // 8083

      let totalWorthObj = {}
      totalWorthObj.pure = total;
      totalWorthObj.formatted = this.addCommas(Math.floor(total));

      return totalWorthObj;

    } else {
      return 'Account Not Set Up'
    }
  }

  addCommas(num) {
    num = num.toString();

    while(num.match(/\d{4}/)) {
      num = num.replace(/(\d{3})(,\d|$)/, ',$1$2');
    }

    return '$' + num;
  }

  getMonthlyIncome() {
    let worth = this.getRetirementNetworth().pure;
    // worth = worth.replace(/\D/g,'');
    let monthly = worth * .04 / 12;
    monthly = Math.floor(monthly);
    return this.addCommas(monthly);
  }


  render() {
    return (
      <div className="main-stats">
        <div className="stats-body">
          <div className="stats-container">
            <div className="stats-icon">
              <i className="blue fas fa-donate"></i>
            </div>
            <div>
              <h3 className="stats-number">{this.getTotalNetworth()}</h3>
              <h3 className="stats-title">Total NetWorth</h3>
            </div>
          </div>

          <div className="stats-container">
            <div className="stats-icon">
              <i className="blue fas fa-user-clock"></i>
            </div>
            <div>
              <h3 className="stats-number">{this.getRetirementNetworth().formatted}</h3>
              <h3 className="stats-title">Portfolio Value at age {this.props.user.desiredRetirementAge}</h3>
            </div>
          </div>

          <div className="stats-container">
            <div className="stats-icon">
              <i className="blue fas fa-piggy-bank"></i>
            </div>
            <div>
              <h3 className="stats-number">{this.getMonthlyIncome()}</h3>
              <h3 className="stats-title">Monthly income at retirement</h3>
            </div>
          </div>



        </div>
      </div>
    )
  }
}

export default MainStats;
