import React, { Component } from 'react';
import Chart from "chart.js";

import { DefaultLabels } from './statsConfigs';

let myBarChart;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class YearlyCompoundBars extends Component {

  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  generateLabels() {
    let userAge = new Date().getFullYear() - this.props.auth.birthYear

    let labels = this.props.auth.yearlyRetirementData;
    let newLabels = {};
    newLabels.years = []
    newLabels.ages = []
    newLabels.colors = []
    for (let i = 0; i < labels.length; i++) {
      newLabels.years.push(`${new Date().getFullYear() + i} - Age: ${userAge + i}`);
      newLabels.ages.push(userAge + i);
      newLabels.colors.push(`rgba(41, 128, ${(185 - i * 3).toString()},1.0)`)
    }
    return newLabels;
  }


  buildChart() {
    // this.props.getUser();

    const myChartRef = this.chartRef.current.getContext("2d");

    if (typeof myBarChart !== "undefined") myBarChart.destroy();


    myBarChart = new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: this.generateLabels().years,
        datasets: [
          {
            label: 'Investment Value',
            backgroundColor: this.generateLabels().colors,
            data: this.props.auth.yearlyRetirementData
          }
        ]
      },
      options: {
        //Customize chart options
        layout: {},
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              suggestedMin: 50,    // minimum will be 0, unless there is a lower value.
            }
          }]
        },
        tooltips: DefaultLabels,
        legend: {
            display: false
          }
      }
    })


  }

  render() {
    return (
      <div className="graphs-container">
        <h3>Yearly Retirement Data (8% Compounded Yearly)</h3>


          <canvas
            id="myChart"
            ref={this.chartRef}
          />

      </div>
    )
  }
}

export default YearlyCompoundBars;
