import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

import StageDetails from './stageDetails';


export class Stage extends Component {

  componentWillMount() {
    this.props.dispatch(
      actions.fetchStageDetails(this.props.params.name)
    )
  }

  render() {
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
        <Link to={'/edit-stage/' + this.props.params.name}>
          <button className='btn btn-success'>Edit</button>
        </Link>
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
