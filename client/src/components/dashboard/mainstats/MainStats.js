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
    let interest = .08;
    let years = user.desiredRetirementAge - (currentYear - user.birthYear);
    let D = user.monthlyInvested * 12;
    let gain = principle * interest;
    D += gain;
    let worth = gain + principle;
    for (var i = 1; i < years; i++) {
      gain = worth * interest;
      D += gain;
      worth = gain + worth + D;
    }

    worth = Math.floor(worth);
    let worthObj = {}

    worthObj.pure = worth;
    worthObj.formatted = this.addCommas(worth);

    if (!user.totalInvested || !user.desiredRetirementAge || !user.birthYear) {
      return 'Account not set up'
    }

    return worthObj;

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
              <h3 className="stats-title">Value at age {this.props.user.desiredRetirementAge}</h3>
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
