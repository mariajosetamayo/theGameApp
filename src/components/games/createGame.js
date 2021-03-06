import React, { Component } from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import CreateStage from '../stages/createStage';

export default class CreateGame extends Component {

  constructor(props){
    super(props)
    this.state={
      gameName: null
    }
    this.saveGameName = this.saveGameName.bind(this);
  }

  saveGameName(e) {
    e.preventDefault();
    const enteredGameName= this.gameName.value;
    this.props.dispatch(
      actions.createGame(enteredGameName)
    );
    this.setState({
      gameName: enteredGameName
    })
  }

  render() {
    const createGameTitleStyle= {
      marginTop: '20%'
    };

    const stageButtonStyles= {
      marginLeft: '2%'
    };

    const saveGameNameButtonStyle= {
      marginTop: '2%'
    };

    return (
      <div>
        <div className='jumbotron'>
          <h1 style={createGameTitleStyle}>Create a New Game</h1>
          <div className="form-group">
            <h3>1. What is the name of your game?</h3>
            <input type="text" className="form-control" ref = {ref => this.gameName = ref}  placeholder="Ex. The lost scientist" />
            <a className='btn btn-success' style={saveGameNameButtonStyle} onClick={this.saveGameName}>Save name</a>
          </div>
          <h3>2. Add more details to your game</h3>
          <div>
            <Link to={'/update-game/' + this.state.gameName}><div className='btn btn-success' style={stageButtonStyles}>Edit game</div></Link>
          </div>
        </div>
      </div>
    );
  }
}
