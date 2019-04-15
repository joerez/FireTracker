import React, { Component } from 'react';
import Chart from "chart.js";

import { DefaultLabels } from './statsConfigs';

let myLineChart;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class DebtChart extends Component {
  constructor(props) {
    super(props)

    this.buildChart = this.buildChart.bind(this);
  }

  chartRef = React.createRef();

  state = {
    inDebt: false
  }


  componentDidMount() {
    if (!this.state.debtFree) {
      this.buildChart();
    }
  }

  componentDidUpdate() {
    if (!this.state.debtFree) {
      this.buildChart();
    }
  }


  buildChart() {
    // this.props.getUser();

      const myChartRef = this.chartRef.current.getContext("2d");

      if (typeof myLineChart !== "undefined") myLineChart.destroy();


      myLineChart = new Chart(myChartRef, {
        type: "line",
        maintainAspectRatio: false,
        data: {
          //Bring in data
          labels: ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January"],
          datasets: [
            {
              label: "Retirement Income",
              data: this.props.auth.monthlyRetirementData,
              backgroundColor: 'rgba(241, 196, 15,.2)',
              pointBackgroundColor: 'white',
              pointBorderColor: 'rgba(241, 196, 15,1)',
              borderColor: 'rgba(241, 196, 15,.8)'
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
            }],
            xAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              }
            }],
          },
          tooltips: DefaultLabels,
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20
            }
          },
        }
      })


  }

  render() {
    return (
      <div>
        <h3 className="center"><span className="red">Debt</span> Tracker</h3>
        <div className="smaller-graphs-container">

          <canvas id="myChart"
            ref={this.chartRef}
          />

          <h3>You will be <span className="green">Debt Free</span> in <span className="green">9</span> months!</h3>
          <p>(This chart is under construction)</p>

        </div>
      </div>
    )
  }
}

export default DebtChart;
