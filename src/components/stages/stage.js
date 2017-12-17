import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import StageDetails from './stageDetails';


export class Stage extends Component {

  componentWillMount() {
    this.props.dispatch(
      actions.fetchStageDetails(this.props.params.name)
    )
  }

  render() {
    console.log('these are the params', this.props.params.name)
    const containerStyle={
      marginTop: '15%'
    }
    const emptyObject={
      name: '',
      content: '',
      instructions: '',
      answer: '',
      requirements: '',
      percentageDeductionPerWrongAnswer: '',
      timeUntilOneTenthDeduction: ''
    }
    return (
      <div style={containerStyle} className='jumbotron'>
        <StageDetails stageDetails={this.props.savedStage === undefined ? emptyObject : this.props.savedStage}/>
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
