import React, { Component } from 'react';
import axios from 'axios';

import './firstVisit.css';

class FirstVisit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 't',
      phone: ''
    }

    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleName(e) {
    this.setState({name: e.target.value.charAt(0).toUpperCase});
  }

  handlePhone(e) {
    this.setState({phone: e.target.value});
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  updateProfile() {
    axios.post('/api/user/setup', this.state).then((res) => {
      this.props.detailsUpdated(res.data.message);
    })
  }

  render() {
    return (
      <div>
        <div onClick={this.props.toggleDetails} className="backdrop-overlay"></div>
        <div onClick={(e) => e.stopPropagation()} className="first-visit-modal">
          <div onClick={this.props.toggleDetails} className="modal-x">X</div>
          <h2>Welcome to FireTracker!</h2>
          <h3>Please set up your profile!</h3>

          <div className="form-group">
            <div className="input-group">
              <label>Name<span className="required-asterisk">*</span></label>
              <input type="text" placeholder="name" onChange={this.handleName} />
            </div>

            <div className="input-group">
              <label>Phone<span className="required-asterisk">*</span></label>
              <input type="phone" placeholder="123-456-7890" onChange={this.handlePhone} />
            </div>

            <div className="input-group">
              <label>Current Occupation</label>
              <input name="currentOccupation" placeholder="Ocupation" onChange={this.handleInputChange} />
            </div>

          </div>


          <div className="form-group">
            <div className="input-group">
              <label>Annual Income</label>
              <input name="annualIncome" placeholder="40000" onChange={this.handleInputChange} />
            </div>

            <div className="input-group">
              <label>Current Savings<span className="required-asterisk">*</span></label>
              <input name="totalSavings" placeholder="1000" onChange={this.handleInputChange} />
            </div>

            <div className="input-group">
              <label>Current Amount Invested<span className="required-asterisk">*</span></label>
              <input name="totalInvested" placeholder="1000" onChange={this.handleInputChange} />
            </div>

          </div>

          <div className="form-group">
            <div className="input-group">
              <label>Monthly Savings</label>
              <input name="monthlySavings" placeholder="500" onChange={this.handleInputChange} />
            </div>

            <div className="input-group">
              <label>Monthly Invested</label>
              <input name="monthlyInvested" placeholder="500" onChange={this.handleInputChange} />
            </div>

            <div className="input-group">
              <label>Monthly Bills</label>
              <input name="monthlyExpenses" placeholder="1500" onChange={this.handleInputChange} />
            </div>

          </div>

          <div className="form-group">
            <div className="input-group">
              <label>Location</label>
              <input name="location" placeholder="San Francisco" onChange={this.handleInputChange} />
            </div>

            <div className="input-group">
              <label>Birthday<span className="required-asterisk">*</span></label>
              <input type="date" name="birthday" placeholder="12/31/1990" onChange={this.handleInputChange} />
            </div>

            <div className="input-group">
              <label>Desired Retirement Age<span className="required-asterisk">*</span></label>
              <input name="desiredRetirementAge" placeholder="35" onChange={this.handleInputChange} />
            </div>


          </div>

          <div>
            <button onClick={this.updateProfile}>Update</button>
            <button onClick={this.props.toggleDetails}>Cancel</button>


          </div>
          <p>Feel free to fill out non-required inputs later</p>

        </div>
      </div>
    )
  }
}

export default FirstVisit;