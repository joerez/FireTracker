import React, { Component } from 'react';
import axios from 'axios';
import Chart from "chart.js";

import { DefaultLabels } from './statsConfigs';
import Alert from '../../alert/Alert';


let myBarChart;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.elements.point.backgroundColor = 'white';

class YearlyCompoundBars extends Component {
  constructor(props) {
    super(props)

    this.updateRetirement = this.updateRetirement.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
    this.renderRight = this.renderError.bind(this);
  }

  state = {
    yearlyAge: this.props.auth.desiredRetirementAge,
    message: ''
  }

  ageChange(e) {
    e.persist();
    setTimeout(() => {
      this.updateRetirement();
    }, 600)
    this.setState({yearlyAge: e.target.value});
  }

  updateRetirement() {
    axios.post('/api/user/retire-age', this.state).then((user) => {
      this.props.getUser();
    }).catch((err) => {
    })
  }

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
        tooltips: DefaultLabels,
        legend: {
            display: false
          },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
        }
      }
    })


  }

  renderError() {
    if (this.state.yearlyAge <= new Date().getFullYear() - this.props.auth.birthYear) {
      return <Alert message="Error: Your retirement year is younger than you!" resetErrors={this.resetErrors}/>
    } else {
      return null
    }
  }

  resetErrors() {
    this.setState({message: ''});
  }


  render() {
    return (
      <div className="graphs-container">
        {this.renderError()}
        <h3>Yearly Retirement Data (8% Compounded Yearly)</h3>
        <div className="year-change">
          <label>Retirement Year: </label>
          <input type="number" onChange={(e) => this.ageChange(e)} value={this.state.yearlyAge} />
        </div>

            <canvas
              id="myChart"
              ref={this.chartRef}
            />
      </div>
    )
  }
}

export default YearlyCompoundBars;
