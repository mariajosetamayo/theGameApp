import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class StageResult extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, instructions, requirements, key } = this.props;
    return (
      <div key={key}>
        <strong>{name}</strong><br/>
        <span>{instructions}</span><br/>
        <span>{requirements}</span>
      </div>
    );
  };
};

export default connect(null)(StageResult);
