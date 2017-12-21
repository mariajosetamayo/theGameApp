import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class GameInstanceContainer extends Component {
  constructor(props) {
    super(props)
  }

  goToTheFirstStage() {
    const firstStageId = this.props.gameInstance.stages[0];
    const gameInstanceId = this.props.gameInstance._id;
    this.props.dispatch(actions.goToFirstStage(firstStageId, gameInstanceId));
  }

  render() {
    const startGame = {
      height: '100px',
      width: '500px',
      position: 'relative',
      top: '300px',
    }
    return (
      <div style={startGame}>
        <strong>Are you ready to begin? The timer (if your game has one) will begin after clicking start!</strong><br/>
        <button onClick={this.goToTheFirstStage.bind(this)}>START THE GAME!!!</button>
      </div>
    );
  };
};

function mapStateToProps (state) {
  return {
    gameInstance: state.app.latestGameInstance,
  };
};

export default connect(mapStateToProps)(GameInstanceContainer);
