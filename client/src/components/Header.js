import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="nav">
        <Link to={this.props.auth ? '/dashboard' : '/'} className="nav-brand nav-item">FireTracker</Link>
        {this.props.auth ? <a href="/api/logout" className="nav-login nav-item">Logout</a> : <a href="/auth/google" className="nav-login nav-item">Login</a>}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
