import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';


export class StageDetails extends Component {
  render() {
    return (
      <div>
        <h2>Here is a summary of the stage you just created</h2>
        <h3>Stage: {this.props.stageDetails.name}</h3>
        <p>Contents: {this.props.stageDetails.content}</p>
        <p>Instructions: {this.props.stageDetails.instructions}</p>
        <p>Answer: {this.props.stageDetails.answer}</p>
        <p>Requirements: {this.props.stageDetails.requirements}</p>
        <p>Percentage deduction per worng answer: {this.props.stageDetails.percentageDeductionPerWrongAnswer}</p>
        <p>Time until deduction: {this.props.stageDetails.timeUntilOneTenthDeduction}</p>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    stage: state.app.createdStage,
    savedStage: state.app.stage
  };
}

export default connect(mapStateToProps)(StageDetails)
