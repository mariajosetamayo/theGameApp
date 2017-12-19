import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Searcher from '../common/searcher';

export class InteractivePlayerContainer extends Component {
  render() {
    const style = {
      top: '100px',
      position: 'relative',
    };
    return (
      <div style={style}>
        <Searcher searchingFor='game' />
      </div>
    );
  };
};

export default connect(null)(InteractivePlayerContainer);
