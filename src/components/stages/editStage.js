import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

import RequiredStageFields from './requiredFields';
import Hint from './hint';
import HintsContainer from './hintsContainer';

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

    const emptyId={
      _id: ''
    }
    return (
      <div>
        <form style={formStyles}>
          <RequiredStageFields updatingGame={this.props.updatingGame} params={this.props.params.name} stageDetails={this.props.savedStage === undefined ? emptyObject : this.props.savedStage} />
        </form>
        <br/>
        <HintsContainer stageId={this.props.savedStage === undefined ? emptyId : this.props.savedStage._id} />
        { this.props.updatingGame ? <Link to={'/update-game/' + this.props.nameOfGame}><button className="btn btn-primary">Go Back to Game</button></Link> : null }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    stage: state.app.createdStage,
    savedStage: state.app.stage,
    updatingGame: state.app.gameData.updatingGame,
    nameOfGame: state.app.gameData.nameOfGame
  };
}

export default connect(mapStateToProps)(EditStage)
