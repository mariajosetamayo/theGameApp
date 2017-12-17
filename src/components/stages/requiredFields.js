import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';


export class RequiredStageFields extends Component {

  constructor(props){
    super(props);
    this.onSaveField = this.onSaveField.bind(this);
  }

  onSaveField (e){
    e.preventDefault();
    const stageName = this.stageName.value;
    const stageContent = this.stageContent.value;
    const stageInstructions = this.stageInstructions.value;
    const stageAnswer = this.stageAnswer.value;
    const stageFiledsValues ={
      name: stageName,
      content: stageContent,
      instructions: stageInstructions,
      answer: stageAnswer
    };

    console.log('these are the saved fields', stageFiledsValues)

    this.props.dispatch(
      actions.storeStageDetails(stageFiledsValues)
    )
  }
  render() {
    console.log('these are the params', location.pathname)
    const formStyles={
      marginTop: '20%'
    }

    const saveButtonStyle={
      marginTop: '5px'
    }

    const textareaStyle={
      width: '100%'
    }
    return (
      <div>
        <div className="form-group">
          <label>Stage Name</label>
          <input ref = {ref => this.stageName = ref} type="text" className="form-control" id="stageName" placeholder="Ex. The lost scientist" />
          {location.pathname === '/create-stage' ? null : <button style={saveButtonStyle} className="btn btn-primary" onClick={this.onSaveField}>Save</button>}
        </div>
        <div className="form-group">
          <label>Content</label>
          <br/>
          <textarea ref = {ref => this.stageContent = ref} style={textareaStyle} className="form-control" rows="5" id="comment" placeholder='The challenge to solve'></textarea>
          {location.pathname === '/create-stage' ? null : <button style={saveButtonStyle} className="btn btn-primary" onClick={this.onSaveField}>Save</button>}
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <br/>
          <textarea ref = {ref => this.stageInstructions = ref} style={textareaStyle} className="form-control" rows="5" id="comment" placeholder='The instructions of your challenge'></textarea>
          {location.pathname === '/create-stage' ? null :<button style={saveButtonStyle} className="btn btn-primary" onClick={this.onSaveField}>Save</button>}
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input ref = {ref => this.stageAnswer = ref} type="text" className="form-control" id="stageName" placeholder="The answer/solution to your challenge" />
          {location.pathname === '/create-stage' ? null :<button style={saveButtonStyle} className="btn btn-primary" onClick={this.onSaveField}>Save</button>}
        </div>
      </div>
    );
  }
}

export default connect(null)(RequiredStageFields)
