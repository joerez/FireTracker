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
      this.props.detailsUpdated(res.message);
    })
  }

  render() {
    return (
      <div className="backdrop-overlay">
        <div className="first-visit-modal">
          <input onChange={this.handleName} />
          <input onChange={this.handlePhone} />
          <button onClick={this.updateProfile}>Update</button>
        </div>
      </div>
    )
  }
}

export default FirstVisit;
