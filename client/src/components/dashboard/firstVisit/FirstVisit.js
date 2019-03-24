import React, { Component } from 'react';
import axios from 'axios';

import './firstVisit.scss';

class FirstVisit extends Component {
  constructor(props) {
    super(props)
    const user = this.props.user;
    this.state = {
      exit: false,
      name: user.name,
      phone: user.phone,
      currentOccupation: user.currentOccupation,
      annualIncome: user.annualIncome,
      totalSavings: user.totalSavings,
      totalInvested: user.totalInvested,
      monthlySavings: user.monthlySavings,
      monthlyInvested: user.monthlyInvested,
      monthlyExpenses: user.monthlyExpenses,
      location: user.location,
      birthYear: user.birthYear,
      desiredRetirementAge: user.desiredRetirementAge
    }

    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.exitModal = this.exitModal.bind(this);
  }

  handleName(e) {
    this.setState({name: e.target.value});
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
      this.props.toggleDetails();
      this.setState({exit: true});
    })
  }

  exitModal() {
    this.props.toggleDetails();
    this.setState({exit: true});
  }

  render() {
    return (
      <div>
        <div onClick={this.exitModal} className={ this.state.exit ? 'backdrop-overlay exit' : 'backdrop-overlay enter'}></div>
        <div onClick={(e) => e.stopPropagation()} className={this.state.exit ? 'first-visit-modal exit' : 'first-visit-modal enter'}>
          <div onClick={this.exitModal} className="modal-x">X</div>
          <h2>Welcome to FireTracker!</h2>
          <h3>Please set up your profile!</h3>

          <div className="form-group">
            <div className="input-group">
              <label>Name<span className="required-asterisk">*</span></label>
              <input type="text" placeholder="Name" onChange={this.handleName} value={this.state.name} />
            </div>

            <div className="input-group">
              <label>Phone<span className="required-asterisk">*</span></label>
              <input type="phone" placeholder="123-456-7890" onChange={this.handlePhone} value={this.state.phone} />
            </div>

            <div className="input-group">
              <label>Current Occupation</label>
              <input name="currentOccupation" placeholder="Ocupation" onChange={this.handleInputChange} value={this.state.currentOccupation} />
            </div>

          </div>


          <div className="form-group">
            <div className="input-group">
              <label>Annual Income</label>
              <input name="annualIncome" placeholder="40000" onChange={this.handleInputChange} value={this.state.annualIncome} />
            </div>

            <div className="input-group">
              <label>Current Savings<span className="required-asterisk">*</span></label>
              <input name="totalSavings" placeholder="1000" onChange={this.handleInputChange} value={this.state.totalSavings} />
            </div>

            <div className="input-group">
              <label>Current Amount Invested<span className="required-asterisk">*</span></label>
              <input name="totalInvested" placeholder="1000" onChange={this.handleInputChange} value={this.totalInvested} />
            </div>

          </div>

          <div className="form-group">
            <div className="input-group">
              <label>Monthly Savings</label>
              <input name="monthlySavings" placeholder="500" onChange={this.handleInputChange} value={this.state.monthlySavings} />
            </div>

            <div className="input-group">
              <label>Monthly Invested</label>
              <input name="monthlyInvested" placeholder="500" onChange={this.handleInputChange} value={this.state.monthlyInvested} />
            </div>

            <div className="input-group">
              <label>Monthly Bills</label>
              <input name="monthlyExpenses" placeholder="1500" onChange={this.handleInputChange} value={this.state.monthlyExpenses} />
            </div>

          </div>

          <div className="form-group">
            <div className="input-group">
              <label>Location</label>
              <input name="location" placeholder="San Francisco" onChange={this.handleInputChange} value={this.state.location} />
            </div>

            <div className="input-group">
              <label>Birth Year<span className="required-asterisk">*</span></label>
              <input type="text" name="birthYear" placeholder="1990" onChange={this.handleInputChange} value={this.state.birthYear} />
            </div>

            <div className="input-group">
              <label>Desired Retirement Age<span className="required-asterisk">*</span></label>
              <input name="desiredRetirementAge" placeholder="35" onChange={this.handleInputChange} value={this.state.desiredRetirementAge} />
            </div>


          </div>

          <div className="first-visit-btns">
            <button className="btn-primary" onClick={this.updateProfile}>Update</button>
            <button className="btn-cancel" onClick={this.exitModal}>Cancel</button>
          </div>

          <p>Feel free to fill out non-required inputs later</p>

        </div>
      </div>
    )
  }
}

export default FirstVisit;
