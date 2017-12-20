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
      height: '100px',
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
          <span>Games in progress: {gamesInProgress.length}</span><br/>
          <span>Games finished: {gamesFinished.length}</span>
        </div>
        <div style={innerRight}>
          <button onClick={this.addUserToTeam.bind(this)}>ADD TO TEAM</button>
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
