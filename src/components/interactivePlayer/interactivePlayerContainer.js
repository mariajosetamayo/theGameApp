import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Searcher from '../common/searcher';

export class InteractivePlayerContainer extends Component {
  renderTeam(team) {
    return team ? team.map(member => { return member.name }).join(', '): '';
  }

  render() {
    const style = {
      top: '100px',
      position: 'relative',
    };
    const searchContainer = {
      height: '300px',
      overflow: 'scroll',
    }
    return (
      <div style={style}>
        <h2>Your team so far is: {this.renderTeam(this.props.team)}</h2>
        <div style={searchContainer}>
          <strong>First pick your team:</strong>
          <Searcher searchingFor='user' />
        </div>
        <div style={searchContainer}>
          <strong>After you have your team, pick a game:</strong>
          <Searcher searchingFor='game' />
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

export default connect(mapStateToProps)(InteractivePlayerContainer);
