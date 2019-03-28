import React, { Component } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class Graph extends Component {

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Yearly Retirement Income",
            data: [60, 121, 182, 243, 304, 364, 417, 478, 539, 600],
            backgroundColor: 'rgba(241, 196, 15,.9)',
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#2c3e50'
          },
          {
            label: "Investments",
            data: [720, 1440, 2160, 2880, 3600, 4320, 5040, 5760, 6480, 7200],
            backgroundColor: 'rgba(39, 174, 96,.9)',
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#2c3e50'
          },
          {
            label: "Savings",
            data: [800, 1600, 2400, 3200, 4000, 4800, 5400, 6200, 7000, 7800],
            backgroundColor: 'rgba(41, 128, 185,.9)',
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#2c3e50'
          },
          {
            label: "Net Worth",
            data: [1520, 3040, 4560, 6080, 7600, 9120, 10440, 11960, 13480, 15000],
            backgroundColor: 'rgba(155, 89, 182,.9)',
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#2c3e50'
          }
        ]
      },
      options: {
        //Customize chart options
        layout: {
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: 50,    // minimum will be 0, unless there is a lower value.
              }
            }]
          }
        }
      });
    }


  render() {
    return (
      <div className="graphs-container">
        <h3>Monthly Deposits</h3>

        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}

export default Graph;
