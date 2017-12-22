import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class UserResult extends Component {
  constructor(props) {
    super(props)
  }

  addUserToTeam() {
    const { name, userId, team } = this.props;
    const teamCopy = team.map(member => { return member });
    teamCopy.push({ userId, name })
    this.props.dispatch(actions.addUserToTeam(teamCopy));
  }

  render() {
    const { name, gamesInProgress, gamesFinished, key } = this.props;
    const outer = {
      height: 'fit-content',
      marginTop: '20px',
      border: '1px solid green',
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
      border: '1px solid green',
      width: 'fit-content',
      fontSize: '20px',
      cursor: 'pointer',
      background: 'transparent',
    };
    return (
      <div style={outer} key={key}>
        <div style={innerLeft}>
          <strong style={nameText}>{name}</strong><br/>
          <span>Games in progress: {gamesInProgress.length}</span><br/>
          <span>Games finished: {gamesFinished.length}</span>
        </div>
        <div style={innerRight}>
          <button style={button} onClick={this.addUserToTeam.bind(this)}>Add</button>
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

export default connect(mapStateToProps)(UserResult);
