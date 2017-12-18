import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import RequiredStageFields from './requiredFields';

export class EditStage extends Component {

  componentWillMount() {
    this.props.dispatch(
      actions.fetchStageDetails(this.props.params.name)
    )
  }

  render() {
    console.log('props in edit saga', this.props)
    const formStyles={
      marginTop:'15%'
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
      <form style={formStyles}>
        <RequiredStageFields params={this.props.params.name} stageDetails={this.props.savedStage === undefined ? emptyObject : this.props.savedStage} />
      </form>
    );
  }
}

function mapStateToProps (state) {
  return {
    stage: state.app.createdStage,
    savedStage: state.app.stage
  };
}

export default connect(mapStateToProps)(EditStage)
