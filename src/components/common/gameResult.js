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
      height: '60px',
      marginTop: '20px',
      border: '1px solid #d2d2d2',
      borderRadius: '5px',
      paddingTop: '5px',
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
    return (
      <div style={outer} key={key}>
        <div style={innerLeft}>
          <strong>{name}</strong><br/>
          <span>{description}</span>
        </div>
        <div style={innerRight}>
          <button onClick={this.createGameInstanceAndRedirect.bind(this)}>PLAY GAME</button>
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
