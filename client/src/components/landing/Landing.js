import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1>FireTracker</h1>
        <h3>Gain <span class="larger-letter">F</span>inancial <span class="larger-letter">I</span>ndependence and <span class="larger-letter">R</span>etire <span class="larger-letter">E</span>arly.</h3>
        <h3>Track your progress to <span class="red larger-letter">FIRE</span>!</h3>
        {this.props.auth ? <Link to="/dashboard">Go to dashboard</Link> : <a href="/auth/google">Try for free</a>}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
