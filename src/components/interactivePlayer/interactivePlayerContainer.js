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
      fontFamily: 'cursive',
    };
    const searchContainer = {
      height: '300px',
      overflow: 'scroll',
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
    const pick = {
      fontSize: '30px',
    };
    const teamText = {
      marginTop: '20px',
      marginBottom: '20px',
    }
    return (
      <div style={style}>
        <div style={background}></div>
        <div style={searchContainer}>
          <strong style={pick}>First, pick your team:</strong><br/><br/>
          <Searcher searchingFor='user' />
        </div>
        <h2 style={teamText}>Your team so far is: {this.renderTeam(this.props.team)}</h2>
        <div style={searchContainer}>
          <strong style={pick}>After you have your team, pick a game:</strong><br/><br/>
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
