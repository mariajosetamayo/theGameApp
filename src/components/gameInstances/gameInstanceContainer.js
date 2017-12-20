import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class GameInstanceContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.params.id}
      </div>
    );
  };
};

export default connect(null)(GameInstanceContainer);
