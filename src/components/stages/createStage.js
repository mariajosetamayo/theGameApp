import React, { Component } from 'react';
import {connect} from 'react-redux';

import RequiredStageFields from './requiredFields';
import * as actions from '../../actions';

export class CreateStage extends Component {

  constructor(props){
    super(props);
    this.state={
      error: false
    }
    this.onCreateStageClick = this.onCreateStageClick.bind(this);
  }


  onCreateStageClick (e){
    e.preventDefault();
    if(!this.stageName.value || !this.stageContent.value || this.stageInstructions.value || this.stageAnswer.value){
      this.setState({
        error: true
      })
    }
    const stage = {
      name: this.stageName.value,
      content: this.stageContent.value,
      instructions: this.stageInstructions.value,
      answer: this.stageAnswer.value,
      timeUntilOneTenthDeduction: this.stageTimeDeduction.value,
      requirements: this.stageRequirements.value,
      percentageDeductionPerWrongAnswer: this.stageWrongAnswerDeduction.value
    }

    console.log('stage values', stage)
    this.props.dispatch(
      actions.createStage(stage)
    )
  }

  renderAlert() {
    return(
      <div className='alert alert-danger'>
        <strong>Oops! Please enter a valid name, content, instructions, and answer</strong>
      </div>
    )
  }

  render() {

    //TODO: transfer styles to individual css files.
    console.log('THESE ARE THE PROPS IN CREATE STAGE', this.props)
    const formStyles={
      marginTop: '20%',
      marginBottom: '15%'
    }

    const saveButtonStyle={
      marginTop: '5px'
    }

    const textareaStyle={
      width: '100%'
    }
    return (
      <form style={formStyles}>
        <div className="form-group">
          <label>Stage Name</label>
          <input required="true" ref = {ref => this.stageName = ref} type="text" className="form-control" id="stageName" placeholder="Ex. The lost scientist" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <br/>
          <textarea required="true" ref = {ref => this.stageContent = ref} style={textareaStyle} className="form-control" rows="5" id="comment" placeholder='The challenge to solve'></textarea>
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <br/>
          <textarea required="true" ref = {ref => this.stageInstructions = ref} style={textareaStyle} className="form-control" rows="5" id="comment" placeholder='The instructions of your challenge'></textarea>
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input required="true" ref = {ref => this.stageAnswer = ref} type="text" className="form-control" id="stageName" placeholder="The answer/solution to your challenge" />
        </div>
        <div className="form-group">
          <label>Time until 1/10 deduction</label>
          <input ref = {ref => this.stageTimeDeduction = ref} type="text" className="form-control" id="stageName" placeholder="The answer/solution to your challenge" />
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <input ref = {ref => this.stageRequirements = ref} type="text" className="form-control" id="stageName" placeholder="The answer/solution to your challenge" />
        </div>
        <div className="form-group">
          <label>Percentage deduction per wrong answer</label>
          <input ref = {ref => this.stageWrongAnswerDeduction = ref} type="text" className="form-control" id="stageName" placeholder="The answer/solution to your challenge" />
        </div>
        {this.state.error ? this.renderAlert() : null}
        <button type="submit" className="btn btn-primary" onClick={this.onCreateStageClick}>Submit</button>
      </form>
    );
  }
}

function mapStateToProps (state) {
  return { stageDetails: state.app.stageValues };
}

export default connect(mapStateToProps)(CreateStage)
