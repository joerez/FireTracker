import React, { Component } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class Bar extends Component {

  state = {
    takeHomePay: 0,
    invested: 0,
    saved: 0
  }

  componentDidMount() {



  }

  chartRef = React.createRef();

  componentDidUpdate() {
    // this.props.getUser();
    let takeHomePay = this.props.auth.takeHomePay;
    let invested = this.props.auth.monthlyInvested;
    let saved = this.props.auth.monthlySavings;
    let spent = takeHomePay - invested - saved;

    console.log(takeHomePay)

    const myOtherChart = this.chartRef.current.getContext("2d");
    let what = 25

    new Chart(myOtherChart, {
        type: "doughnut",
        data: {
        labels: [`Invested`, "Saved", "spent"],
        datasets: [
          {
            data: [invested, saved, spent],
            backgroundColor: ['rgba(241, 196, 15,1)', 'rgba(41, 128, 185,1)', 'rgba(39, 174, 96,1)'],
          }
        ]
      }
      });
    }


  render() {
    return (
      <div className="graphs-container">
        <h3>Monthly Saved vs Spent</h3>

        <canvas
          id="bar"
          ref={this.chartRef}
        />
      </div>
    )
  }
}

export default Bar;
