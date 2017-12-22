import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class FinishedGameInstanceContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const endedGame = {
      height: '100px',
      width: '500px',
      position: 'relative',
      top: '300px',
      fontFamily: 'cursive',
    };
    const score = {
      display: 'inline-block',
      fontWeight: 'bolder',
      fontSize: '60px',
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
    const text = {
      fontSize: '25px'
    };
    return (
      <div style={endedGame}>
        <div style={background}></div>
        <strong style={text}>You have finished the game with a score of: </strong><br/><br/>
        <h1 style={score}>{`${Math.ceil(this.props.gameInstance.score)}/100`}</h1>
      </div>
    );
  };
};

function mapStateToProps (state) {
  return {
    gameInstance: state.app.latestFinishedGameInstance,
  };
};

export default connect(mapStateToProps)(FinishedGameInstanceContainer);
