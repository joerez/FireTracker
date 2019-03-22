import React, { Component } from 'react';
import axios from 'axios';

import './firstVisit.css';

class FirstVisit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      phone: ''
    }

    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  handlePhone(e) {
    this.setState({phone: e.target.value});
  }

  updateProfile() {
    axios.post('/api/user/setup', this.state).then((res) => {
      this.props.detailsUpdated(res.data.message);
    })
  }

  render() {
    return (
      <div onClick={this.props.toggleDetails} className="backdrop-overlay">
        <div onClick={(e) => e.stopPropagation()} className="first-visit-modal">
          <h2>Welcome to FireTracker!</h2>
          <p>Please set up your profile!</p>
          <div className="input-group">
            <label>Name:</label>
            <input placeholder="name" onChange={this.handleName} />
          </div>

          <div className="input-group">
            <label>Phone:</label>
            <input placeholder="123-456-7890" onChange={this.handlePhone} />
          </div>
          <button onClick={this.updateProfile}>Update</button>
        </div>
      </div>
    )
  }
}

export default FirstVisit;
