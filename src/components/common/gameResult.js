import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class GameResult extends Component {
  constructor(props) {
    super(props)
  }

  createGameInstanceAndRedirect() {
    const { gameId, team } = this.props;
    const teamIds = team.length > 0 ? team.map(member => { return member.userId }) : []
    this.props.dispatch(actions.createGameInstanceAndRedirect(gameId, teamIds));
  }

  render() {
    const { name, description, key } = this.props;
    const outer = {
      height: 'fit-content',
      marginTop: '20px',
      border: '1px solid darkred',
      borderRadius: '5px',
      paddingTop: '5px',
      paddingBottom: '15px',
      paddingLeft: '5px',
      position: 'relative',
    };
    const innerLeft = {
      position: 'relative',
      display: 'inline-block',
      width: '75%',
    };
    const innerRight = {
      position: 'relative',
      display: 'inline-block',
      width: '24%',
      verticalAlign: 'top',
      paddingTop: '13px',
    };
    const nameText = {
      fontSize: '25px',
    };
    const button = {
      padding: '5px',
      borderRadius: '3px',
      border: '1px solid darkred',
      width: 'fit-content',
      fontSize: '20px',
      cursor: 'pointer',
      background: 'transparent',
    };
    return (
      <div style={outer} key={key}>
        <div style={innerLeft}>
          <strong style={nameText}>{name}</strong><br/>
          <span>{description}</span>
        </div>
        <div style={innerRight}>
          <button style={button} onClick={this.createGameInstanceAndRedirect.bind(this)}>Play Now</button>
        </div>
      </div>
    );
  };
};

function mapStateToProps (state) {
  return {
    team: state.app.latestTeam,
  };
};

export default connect(mapStateToProps)(GameResult);
