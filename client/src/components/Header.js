import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClickOutHandler from 'react-onclickout';


import { Link } from 'react-router-dom';

class Header extends Component {

  state = {
    toggleDropDown: false,
    menuHide: false,
    cogGear: false
  }

  toggleDropDown() {
    if (this.state.toggleDropDown) {
      this.setState({menuHide: true, cogGear: false});
      setTimeout(() => {
        this.setState({toggleDropDown: false, menuHide: false})
      }, 300)
    } else {
      this.setState({toggleDropDown: true, cogGear: true})
    }
  }


  renderRight() {
    if (!this.props.auth) {
      return (
        <a href="/auth/google" className="nav-login nav-item">Login</a>
      )
    }


    //logged in
    return (
      <div className="nav-login">
        <button onClick={() => this.toggleDropDown()} className={`settings-btn ${this.state.cogGear ? 'turn' : ''}`}><i className="fas fa-cog"></i></button>
        {this.state.toggleDropDown ?
              <ClickOutHandler onClickOut={() => { if (this.state.toggleDropDown) {this.toggleDropDown()}}}>
                <div className={`nav-drop-down ${this.state.menuHide ? 'hide' : ''}`}>
                  <Link onClick={() => this.toggleDropDown()} className="drop-link" to="/">Home</Link>
                  <Link onClick={() => this.toggleDropDown()} className="drop-link" to="/dashboard">Dashboard</Link>
                  <Link onClick={() => this.toggleDropDown()} className="drop-link" to="/profile">Profile</Link>
                  <a className="drop-link" href="/api/logout">Logout</a>
                </div>
              </ClickOutHandler>
            : ''}
      </div>
    )
  }

  render() {
    return (
      <div className="nav">
        <Link to={this.props.auth ? '/dashboard' : '/'} className="nav-brand nav-item">{this.props.auth ? '' : 'FireTracker'}</Link>

        {this.renderRight()}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
