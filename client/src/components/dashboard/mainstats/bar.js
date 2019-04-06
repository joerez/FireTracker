import React, { Component } from 'react';
import Chart from "chart.js";

import { DefaultLabels } from './statsConfigs';

let myBarChart;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class Bar extends Component {

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
            backgroundColor: ['rgba(241, 196, 15,1)', 'rgba(41, 128, 185,1)', 'rgba(39, 174, 96,1)'],
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

    renderMaths() {
      let percentSavedAndInvested = 0;
      let takeHomePay = this.props.auth.takeHomePay;
      let invested = this.props.auth.monthlyInvested;
      let saved = this.props.auth.monthlySavings;

      percentSavedAndInvested = Math.floor((invested + saved) / takeHomePay * 100);

      if (percentSavedAndInvested >= 20) {
        return (
          <div className="rendered-math">
            <h3>Percentage Saved: <span className="good">{percentSavedAndInvested}%</span></h3>
          </div>
        )
      } else {
        return (
          <div className="rendered-math">
            <h3>Percentage Saved: <span className="bad">{percentSavedAndInvested}%</span></h3>
            <p>Aim to save 20% or more to be in the green!</p>
          </div>
        )
      }

    }


  render() {
    return (
      <div className="smaller-graphs-container">
        <h3>Monthly Saved vs Spent</h3>

        <div className="doughnut-graph">
          <canvas
            id="bar"
            ref={this.chartRef}
          />
        </div>

        {this.renderMaths()}
      </div>
    )
  }
}

export default Bar;
