import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class UserResult extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, gamesInProgress, gamesFinished, key } = this.props;
    return (
      <div key={key}>
        <strong>{name}</strong><br/>
        <span>{gamesInProgress.length}</span><br/>
        <span>{gamesFinished.length}</span>
      </div>
    );
  };
};

export default connect(null)(UserResult);
