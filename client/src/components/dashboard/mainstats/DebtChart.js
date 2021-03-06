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
      let labels = [];
      let labelValue = 1;
      this.props.auth.debtFreeData.forEach(() => {
        labels.push('Month: ' + labelValue)
        labelValue += 1;
      })

      myLineChart = new Chart(myChartRef, {
        type: "line",
        maintainAspectRatio: false,
        data: {
          //Bring in data
          labels: labels,
          datasets: [
            {
              label: "Retirement Income",
              data: this.props.auth.debtFreeData,
              backgroundColor: 'rgba(241, 196, 15,.4)',
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
          <h3>You will be <span className="green">Debt Free</span> in <span className="green">{this.props.auth.debtFreeData.length}</span> months!</h3>

        </div>
      </div>
    )
  }
}

export default DebtChart;
