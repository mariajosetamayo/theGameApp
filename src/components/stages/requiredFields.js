import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';


export class RequiredStageFields extends Component {

  constructor(props){
    super(props);
    this.state={
      name: null,
      content: null,
      instructions: null,
      answer: null,
      requirements: null,
      percentageDeductionPerWrongAnswer: null,
      timeUntilOneTenthDeduction: null
    }
    this.onSaveField = this.onSaveField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  onSaveField (e){
    e.preventDefault();
    const stageName = this.stageName.value;
    const stageContent = this.stageContent.value;
    const stageInstructions = this.stageInstructions.value;
    const stageAnswer = this.stageAnswer.value;
    const timeUntilDeduction = this.timeUntilDeduction.value;
    const requirements = this.requirements.value;
    const deductions = this.deductions.value;
    const stageFieldsValues ={
      name: stageName,
      content: stageContent,
      instructions: stageInstructions,
      answer: stageAnswer,
      timeUntilOneTenthDeduction: timeUntilDeduction,
      requirements: requirements,
      deductions: deductions
    };

    console.log('these are the saved fields', stageFieldsValues)

    this.props.dispatch(
      actions.editStageDetails(this.props.params, stageFieldsValues)
    )
  }

  handleChange(event) {
    event.preventDefault()
    console.log('this is the event', event.target.id)
    this.setState({
      name: this.stageName.value,
      content: this.stageContent.value,
      instructions: this.stageInstructions.value,
      answer: this.stageAnswer.value,
      timeUntilOneTenthDeduction: this.timeUntilDeduction.value,
      requirements: this.requirements.value,
      percentageDeductionPerWrongAnswer: this.deductions.value
    })
  }

  render() {
    // console.log('these are the params', location.pathname)
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
          <input id='stageName' value= {this.state.name === null ? this.props.stageDetails.name : this.state.name} onChange={this.handleChange} ref = {ref => this.stageName = ref} type="text" className="form-control"  placeholder="Ex. The lost scientist" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <br/>
          <textarea id='stageContent' value={this.state.content === null ? this.props.stageDetails.content : this.state.content } onChange={this.handleChange} ref = {ref => this.stageContent = ref} style={textareaStyle} className="form-control" rows="5" placeholder='The challenge to solve'></textarea>
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <br/>
          <textarea id='stageInstructions' value={this.state.instructions === null ? this.props.stageDetails.instructions : this.state.instructions} onChange={this.handleChange} ref = {ref => this.stageInstructions = ref} style={textareaStyle} className="form-control" rows="5" placeholder='The instructions of your challenge'></textarea>
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input id='stageAnswer' value={this.state.answer === null ? this.props.stageDetails.answer : this.state.answer} onChange={this.handleChange} ref = {ref => this.stageAnswer = ref} type="text" className="form-control"  placeholder="The answer/solution to your challenge" />
        </div>
        <div className="form-group">
          <label>Time until 1/10 deduction</label>
          <input id='stagetimeUntilOneTenthDeduction' value={this.state.timeUntilOneTenthDeduction === null ? this.props.stageDetails.timeUntilOneTenthDeduction : this.state.timeUntilOneTenthDeduction} onChange={this.handleChange} ref = {ref => this.timeUntilDeduction = ref} type="text" className="form-control"  placeholder="The answer/solution to your challenge" />
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <input id='stageRequirements' value={this.state.requirements === null ? this.props.stageDetails.requirements : this.state.requirements} onChange={this.handleChange} ref = {ref => this.requirements = ref} type="text" className="form-control"  placeholder="The answer/solution to your challenge" />
        </div>
        <div className="form-group">
          <label>Percentage deduction per wrong answer</label>
          <input id='stageDeductions' value={this.state.percentageDeductionPerWrongAnswer === null ? this.props.stageDetails.percentageDeductionPerWrongAnswer : this.state.percentageDeductionPerWrongAnswer} onChange={this.handleChange} ref = {ref => this.deductions = ref} type="text" className="form-control"  placeholder="The answer/solution to your challenge" />
        </div>
        <button style={saveButtonStyle} className="btn btn-primary" onClick={this.onSaveField}>Save</button>
      </div>
    );
  }
}

export default connect(null)(RequiredStageFields)
