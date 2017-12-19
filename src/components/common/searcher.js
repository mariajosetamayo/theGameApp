import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class Searcher extends Component {
  constructor(props) {
    super(props)
  }

  onKeyUp (e) {
    e.preventDefault();
    this.props.dispatch(actions.search(this.props.searchingFor, e.target.value));
  }

  render() {
    return (
      <div>
        <input id= 'searchField' type='text' placeholder={`Find a ${this.props.searchingFor}!`} onKeyUp={this.onKeyUp.bind(this)} />
      </div>
    );
  };
};

function mapStateToProps (state) {
  return {
    userResults: state.app.userResults,
    gameResults: state.app.gameResults,
    stageResults: state.app.stageResults,
  };
};

export default connect(mapStateToProps)(Searcher);
