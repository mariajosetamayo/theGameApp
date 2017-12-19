import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import GameResult from './gameResult'
import StageResult from './stageResult'
import UserResult from './userResult'

export class SearchResults extends Component {
  constructor(props) {
    super(props)
  }

  renderResults() {
    const { type } = this.props;
    if (type === 'user') {
      return this.renderUsers();
    } else if (type === 'game') {
      return this.renderGames();
    } else {
      return this.renderStages();
    }
  }

  renderGames() {
    const { gameResults } = this.props;
    if (!gameResults) { return };
    return this.props.gameResults.map((game, index) => {
      return (<GameResult key={index} name={game.name} description={game.description}/>)
    });
  }

  renderStages() {
    const { stageResults } = this.props;
    if (!stageResults) { return };
    return this.props.stageResults.map((stage, index) => {
      return (<StageResult key={index} name={stage.name} instructions={stage.instructions} requirements={stage.requirements}/>)
    });
  }

  renderUsers() {
    const { userResults } = this.props;
    if (!userResults) { return };
    return this.props.userResults.map((user, index) => {
      return (<UserResult key={index} name={user.name} gamesInProgress={user.gamesInProgress} gamesFinished={user.gamesFinished}/>)
    });
  }

  render() {
    const { type, userResults, gameResults, stageResults } = this.props;
    return (
      <div>
        {this.renderResults()}
      </div>
    );
  };
};

export default connect(null)(SearchResults);
