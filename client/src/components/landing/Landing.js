import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1>FireTracker</h1>
        <h3>Fire: Financial Independence, Retire Early.</h3>
        <h3>Track your progress to FIRE!</h3>
        <Link to={this.props.auth ? '/dashboard' : '/auth/google'}>{this.props.auth ? 'Go to dashboard' : 'Try for free'}</Link>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
