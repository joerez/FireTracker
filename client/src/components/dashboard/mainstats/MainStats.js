import React, { Component } from 'react';
import compound from 'compound-interest';

import StatBox from './StatBox';

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

          <StatBox icon="donate" value={this.getTotalNetworth()} title="Total Networth"
            hint="Current total savings and investments."
           />

          <StatBox icon="user-clock" value={this.getRetirementNetworth().formatted} title={`Portfolio Value at age ${this.props.user.desiredRetirementAge}`}
            hint="The total value of your investments at your desired retirement age."
           />

          <StatBox icon="piggy-bank" value={this.getMonthlyIncome()} title="Monthly income at retirement"
            hint="How much of your investment portfolio you can safely withdraw at a 4% rate."
           />

        </div>
      </div>
    )
  }
}

export default MainStats;
