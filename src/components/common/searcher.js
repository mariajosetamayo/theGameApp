import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SearchResults from './searchResults'

export class Searcher extends Component {
  constructor(props) {
    super(props)
  }

  onKeyUp(e) {
    const { dispatch, searchingFor } = this.props;
    e.preventDefault();
    dispatch(actions.search(searchingFor, e.target.value));
  }

  render() {
    const { searchingFor, userResults, gameResults, stageResults } = this.props;
    return (
      <div>
        <input id= 'searchField' type='text' placeholder={`Find a ${searchingFor}!`} onKeyUp={this.onKeyUp.bind(this)} />
        <SearchResults type={searchingFor} userResults={userResults} gameResults={gameResults} stageResults={stageResults} />
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
