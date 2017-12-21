import React, { Component } from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

import CreateStage from '../stages/createStage';
import RequiredStageFields from '../stages/requiredFields';

export class UpdateGame extends Component {

  constructor(props){
    super(props);
    this.state= {
      numberOfStages: 0,
      gameName: null,
      description: null,
      requirements: null
    };
    this.addStage = this.addStage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveGame = this.saveGame.bind(this);
  }

  componentWillMount(){
    this.props.dispatch(
      actions.fetchGameDetails(this.props.params.name)
    );
  }

  addStage(e) {
    e.preventDefault();
    this.setState({
      numberOfStages: this.state.numberOfStages + 1
    });
  }

  handleChange(e) {
    // e.preventDefault();
    this.setState({
      gameName: this.gameName.value,
      description: this.gameDescription.value,
      requirements: this.gameRequirements.value
    })
  }

  saveGame() {
    const gameDetails={
      gameName: this.state.gameName,
      description: this.state.description,
      requirements: this.state.requirements
    }
    console.log('GAME DETAILS', gameDetails)
    this.props.dispatch(
      actions.editGameDetails(this.state.gameName, gameDetails)
    );
  }


  render() {
    console.log('PROPS IN UPDATE GAME', this.props)
    const addStageButtonStyle= {
      marginTop: '10%'
    }

    const formStyle={
      marginTop: '20%'
    }

    const stages= [];

    for(var i = 0; i < this.state.numberOfStages; i ++){
      stages.push(
        <div key={i} id={'stage'+i}>
          <CreateStage updateGamePage='true' gameName={this.props.params.name}/>
        </div>)
    };

    const blankObject={}

    return (
      <div style={formStyle}>
        <div className="form-group">
          <label>Game Name</label>
          <input id='gameName' type="text" className="form-control" value={this.props.gameDetails === undefined ? blankObject : this.state.gameName === null ? this.props.gameDetails.name : this.state.gameName} onChange={this.handleChange} ref = {ref => this.gameName = ref} placeholder="Ex. The lost scientist" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea id='gameDescription' className="form-control" value={this.props.gameDetails === undefined ? blankObject : this.state.description === null ? this.props.gameDetails.description : this.state.description} onChange={this.handleChange} ref = {ref => this.gameDescription = ref} rows="5" placeholder='The description of your game.'></textarea>
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <textarea id='gameRequirements' className="form-control" rows="5" value={this.props.gameDetails === undefined ? blankObject : this.state.requirements === null ? this.props.gameDetails.requirements : this.state.requirements} onChange={this.handleChange} ref = {ref => this.gameRequirements = ref} placeholder='The requirements of your game.'></textarea>
        </div>
        <div>
          {stages}
        </div>
        <p style={addStageButtonStyle}><a id='saveGame' onClick={this.saveGame} className='btn btn-success'>Save</a></p>
        <p style={addStageButtonStyle}><a id='addStage' onClick={this.addStage} className='btn btn-success'>Add Stage</a></p>
      </div>
    );
  }
}

function mapStateToProps (state) {
  console.log('state', state)
  return {
    gameDetails: state.app.gameDetails ,
    savedStageSummary: state.app.savedStageSummary
  };
}

export default connect(mapStateToProps)(UpdateGame)
