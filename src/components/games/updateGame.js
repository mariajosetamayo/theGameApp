import React, { Component } from 'react';

import CreateStage from '../stages/createStage';
import RequiredStageFields from '../stages/requiredFields';


export default class UpdateGame extends Component {

  constructor(props){
    super(props);
    this.state= {
      numberOfStages: 0
    };
    this.addStage = this.addStage.bind(this);
  }

  addStage(e) {
    e.preventDefault();
    this.setState({
      numberOfStages: this.state.numberOfStages + 1
    });
    // let element = document.getElementById('addStage');
    // scrollintoview(element);
  }

  render() {
    const addStageButtonStyle= {
      marginTop: '10%'
    }

    const formStyle={
      marginTop: '20%'
    }

    const stages= [];

    for(var i = 0; i < this.state.numberOfStages; i ++){
      stages.push(
        <div key={i} id={'div'+i}>
          <CreateStage location='updateGame'/>
        </div>)
    };

    return (
      <div style={formStyle}>
        <div className="form-group">
          <label>Game Name</label>
          <input id='gameName' type="text" className="form-control"  placeholder="Ex. The lost scientist" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea id='gameDescription' className="form-control" rows="5" placeholder='The description of your game.'></textarea>
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <textarea id='gameRequirements' className="form-control" rows="5" placeholder='The requirements of your game.'></textarea>
        </div>
        <div>
          {stages}
        </div>
        <p style={addStageButtonStyle}><a id='addStage' onClick={this.addStage} className='btn btn-success'>Add Stage</a></p>
      </div>
    );
  }
}
