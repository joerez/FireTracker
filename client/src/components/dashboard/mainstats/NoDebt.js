import React, { Component } from 'react';

import debtFreePic from './debt-free.jpg';

class NoDebt extends Component {

  render() {
    return (
      <div>
        <h3 className="center"><span className="red">Debt</span> Tracker</h3>
        <div className="smaller-graphs-container all-center-flex">
          <img width="100%" src={debtFreePic} alt="debt free" />
        </div>
      </div>
    )
  }
}

export default NoDebt;
