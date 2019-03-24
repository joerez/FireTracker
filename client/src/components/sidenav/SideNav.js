import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SideNav.scss';

class SideNav extends Component {
  render() {
    return (
      <div className="side-nav">
        <div className="side-nav-top">
          <Link to="/dashboard" className="nav-brand nav-item">FireTracker</Link>
        </div>

        <div className="side-nav-links">

        </div>
      </div>
    )
  }
}

export default SideNav;
