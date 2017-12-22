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
      width: '100%',
      position: 'relative',
      top: '300px',
      fontFamily: 'cursive',
      fontSize: '35px',
    }
    const button = {
      padding: '5px',
      borderRadius: '5px',
      border: '1px solid green',
      width: 'fit-content',
      fontSize: '60px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      position: 'relative',
      marginLeft: '40%',
      marginTop: '75px',
    };
    const background = {
      position: 'fixed',
      height: '100%',
      width: '100%',
      backgroundImage: "url('http://2.bp.blogspot.com/-yMZWhmgr2IM/URPUVTLQl7I/AAAAAAAAkyE/DdOjvCqpPD4/s1600/oldpaper-backgroundfairy.jpg')",
      zIndex: '-100',
      top: '0',
      left: '0',
    };
    return (
      <div style={startGame}>
        <div style={background}></div>
        <strong>Are you ready to begin? The timer (if your game has one) will begin after clicking start!</strong><br/>
        <button style={button} onClick={this.goToTheFirstStage.bind(this)}>Start</button>
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
