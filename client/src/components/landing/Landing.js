import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../sidenav/firetracker.png';

import './landing.scss';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Link to={this.props.auth ? "/dashboard" :"/"}><img className="nav-landing-logo" alt="logo" src={logo} /></Link>
        <h1>FireTracker.io</h1>
        <h3>Gain <div class="larger-letter">F</div>inancial <div class="larger-letter">I</div>ndependence and <div class="larger-letter">R</div>etire <div class="larger-letter">E</div>arly.</h3>
        <h3>Track your progress to <div class="larger-letter">FIRE!</div></h3>
        {this.props.auth ? <Link className="call-to-action" to="/dashboard">Go to dashboard</Link> : <a className="call-to-action" href="/auth/google">Try for free</a>}

        <div className="bottom">
          <h3>FireTracker is currently in open Alpha Testing.</h3>
          <h3>Launching in Summer, 2019.</h3>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
