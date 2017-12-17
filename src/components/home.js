import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

export class Home extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    const buttonsStyle={
      marginLeft: '5px'
    }

    const buttonContainerStyle={
      textAlign: 'center',
      marginTop: '20px'
    }

    const optionsContainerStyle={
      marginTop: '15%'
    }
    return (
      <div>
        <div className='jumbotron' style={optionsContainerStyle}>
          <h1>Welcome User</h1>
          <p>What would you like to do today?</p>
          <div style={buttonContainerStyle}>
            <Link to='/play-game'>
              <button style={buttonsStyle}>Play Game</button>
            </Link>
            <Link to='/create-game'>
              <button style={buttonsStyle}>Create Game</button>
            </Link>
            <Link to='/create-stage'>
              <button style={buttonsStyle}>Create Stage</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Home);
