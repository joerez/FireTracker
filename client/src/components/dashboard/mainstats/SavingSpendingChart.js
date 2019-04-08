import React, { Component } from 'react';
import Chart from "chart.js";

import { DefaultLabels } from './statsConfigs';

let myBarChart;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class SavingSpendingChart extends Component {

  state = {
    takeHomePay: 0,
    invested: 0,
    saved: 0
  }

  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }


  buildChart() {
    // this.props.getUser();
    if (this.props.auth) {
    let takeHomePay = this.props.auth.takeHomePay;
    let invested = this.props.auth.monthlyInvested;
    let saved = this.props.auth.monthlySavings;
    let spent = takeHomePay - invested - saved;

    console.log(takeHomePay)

    const myOtherChart = this.chartRef.current.getContext("2d");

    if (typeof myBarChart !== "undefined") myBarChart.destroy();


    myBarChart = new Chart(myOtherChart, {
        type: "pie",
        height: 200,
        data: {
        labels: [`Invested`, "Saved", "spent"],
        datasets: [
          {
            data: [invested, saved, spent],
            backgroundColor: ['rgba(41, 128, 185,1.0)', 'rgba(39, 174, 96,1)', 'rgba(231, 76, 60,1.0)'],
          }
        ]
      },
      options: {
        tooltips: DefaultLabels,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 20
          }
        }
      }
      });
    }
    }

    renderMaths() {
      if (this.props.auth) {
      let percentSavedAndInvested = 0;
      let takeHomePay = this.props.auth.takeHomePay;
      let invested = this.props.auth.monthlyInvested;
      let saved = this.props.auth.monthlySavings;

      percentSavedAndInvested = Math.floor((invested + saved) / takeHomePay * 100);

      if (percentSavedAndInvested >= 10) {
        return (
          <div className="rendered-math">
            <h3>Percentage Saved: <span className="good">{percentSavedAndInvested}%</span></h3>
          </div>
        )
      } else {
        return (
          <div className="rendered-math">
            <h3>Percentage Saved: <span className="bad">{percentSavedAndInvested}%</span></h3>
            <p>Aim to save 10% or more to be in the green!</p>
          </div>
        )
      }
    }
    }


  render() {
    return (
      <div>
        <h3 className="center">Monthly <span className="green">Saved</span> & <span className="blue">Invested</span> vs <span className="red">Spent</span></h3>

        <div className="smaller-graphs-container">

          <div className="doughnut-graph">
            <canvas
              id="bar"
              ref={this.chartRef}
            />
          </div>

          {this.renderMaths()}
        </div>
      </div>
    )
  }
}

export default SavingSpendingChart;
