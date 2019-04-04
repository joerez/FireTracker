import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../App.scss';
import './styles.scss';

import Header from './Header';
import Landing from './landing/Landing';
import Dashboard from './dashboard/Dashboard';


class App extends Component {


  componentDidMount() {
    this.props.fetchUser();
  }

  render() {



    return (
        <BrowserRouter>
            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/dashboard"
              render={(routeProps) => (
                  <Dashboard {...routeProps} auth={this.props.auth} getUser={() => this.props.fetchUser()} />
                )}
                />
            </div>
        </BrowserRouter>
    );
  };
};


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
