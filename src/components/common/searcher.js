import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SearchResults from './searchResults'

export class Searcher extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(actions.clearTeam());
  }

  onKeyUp(e) {
    const { dispatch, searchingFor } = this.props;
    e.preventDefault();
    dispatch(actions.search(searchingFor, e.target.value));
  }

  render() {
    const { searchingFor, userResults, gameResults, stageResults } = this.props;
    const input = {
      borderRadius: '5px',
      borderStyle: 'solid',
      border: '1px black',
    };
    return (
      <div>
        <input style={input} id= 'searchField' type='text' placeholder={`Find a ${searchingFor}!`} onKeyUp={this.onKeyUp.bind(this)} />
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
