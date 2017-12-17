import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';


export class Stage extends Component {

  componentWillMount() {
    this.props.dispatch(
      actions.fetchStageDetails(this.props.stage.name)
    )
  }
  render() {
    const containerStyle={
      marginTop: '15%'
    }
    return (
      <div style={containerStyle} className='jumbotron'>
        <h2>Here is a summary of the stage you just created</h2>
        <h3>Stage: {this.props.savedStage.name}</h3>
        <p>Contents: {this.props.savedStage.content}</p>
        <p>Instructions: {this.props.savedStage.instructions}</p>
        <p>Answer: {this.props.savedStage.answer}</p>
        <p>Requirements: {this.props.savedStage.requirements}</p>
        <p>Percentage deduction per worng answer: {this.props.savedStage.percentageDeductionPerWrongAnswer}</p>
        <p>Time until deduction: {this.props.savedStage.timeUntilOneTenthDeduction}</p>
        <button className='btn btn-success'>Edit</button>
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

export default connect(mapStateToProps)(Stage)
