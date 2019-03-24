import React, { Component } from 'react';

import './MainStats.scss';

class MainStats extends Component {
  constructor(props) {
    super(props);

    this.getRetirementNetworth = this.getRetirementNetworth.bind(this);
    this.getMonthlyIncome = this.getMonthlyIncome.bind(this);
  }

  componentDidMount() {
    this.getRetirementNetworth();
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

    let principle = user.totalInvested;
    let interest = 80;
    let years = user.desiredRetirementAge - (currentYear - user.birthYear);
    let D = 0;
    let gain = principle * interest / 100;
    D += gain;
    let worth = gain + principle;
    for (var i = 1; i < years; i++) {
      gain = worth * interest / 100;
      D += gain;
      worth = gain + worth;
    }

    worth = Math.floor(worth);

    worth = this.addCommas(worth);


    if (!user.totalInvested || !user.desiredRetirementAge || !user.birthYear) {
      return 'Account not set up'
    }

    return worth;

  }

  addCommas(num) {
    num = num.toString();

    while(num.match(/\d{4}/)) {
      num = num.replace(/(\d{3})(,\d|$)/, ',$1$2');
    }

    return '$' + num;
  }

  getMonthlyIncome() {
    let worth = this.getRetirementNetworth();
    worth = worth.replace(/[^0-9]/, '');
    console.log(worth)
    worth = parseInt(worth) * .04;

    return this.addCommas(worth);
  }


  render() {
    return (
      <div className="main-stats">
        <div className="stats-top">
          <h3>Main Stats</h3>
        </div>

        <div className="stats-body">
          <h3>Total NetWorth: {this.getTotalNetworth()}</h3>

          <h3>Value at age {this.props.user.desiredRetirementAge}: {this.getRetirementNetworth()}</h3>

          <h3>Monthly income at retirement: {this.getMonthlyIncome()}</h3>
        </div>
      </div>
    )
  }
}

export default MainStats;
