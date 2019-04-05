import React, { Component } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class Graph extends Component {

  chartRef = React.createRef();

  componentDidUpdate() {
    // this.props.getUser();

    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January"],
        datasets: [
          {
            label: "Yearly Retirement Income",
            data: this.props.auth.monthlyRetirementData,
            backgroundColor: 'rgba(241, 196, 15,.2)',
            pointBackgroundColor: 'white',
            pointBorderColor: 'rgba(241, 196, 15,1)',
            borderColor: 'rgba(241, 196, 15,.8)'
          },
          {
            label: "Savings",
            data: this.props.auth.monthlySavingsData,
            backgroundColor: 'rgba(41, 128, 185,.2)',
            pointBackgroundColor: 'white',
            pointBorderColor: 'rgba(41, 128, 185,1)',
            borderColor: 'rgba(41, 128, 185,.8)'
          },
          {
            label: "Investments",
            data: this.props.auth.monthlyInvestedData,
            backgroundColor: 'rgba(39, 174, 96,.2)',
            pointBackgroundColor: 'white',
            pointBorderColor: 'rgba(39, 174, 96,1)',
            borderColor: 'rgba(39, 174, 96,.8)'
          },
          {
            label: "Net Worth",
            data: this.props.auth.monthlyNetworthData,
            backgroundColor: 'rgba(155, 89, 182,.2)',
            pointBackgroundColor: 'white',
            pointBorderColor: 'rgba(155, 89, 182,1)',
            borderColor: 'rgba(155, 89, 182,.8)'
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
        <h3>Monthly Savings</h3>

        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}

export default Graph;
