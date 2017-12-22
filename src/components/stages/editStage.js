import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

import RequiredStageFields from './requiredFields';
import Hint from './hint';
import HintsContainer from './hintsContainer';

export class EditStage extends Component {
  constructor(props){
    super(props);
    this.state= {
      savedStage: this.props.savedStage,
    };
  }

  componentWillMount() {
    if (this.props.id) {
      this.props.dispatch(actions.fetchStageDetailsById(this.props.id))
    } else {
      this.props.dispatch(actions.fetchStageDetails(this.props.params.name))
    }
  }

  saveStageDetails() {
    this.props.dispatch(
      actions.saveStageSummary(this.props.savedStage)
    )
  }

  componentWillReceiveProps(nextProps) {
    console.log("RECEIVING PROPS: ", nextProps)
    if (!this.props.id || (this.props.id && nextProps.savedStage._id !== this.props.id)) {
      console.log("STATE IS BEING SET! ", nextProps.savedStage)
      this.setState({ savedStage: nextProps.savedStage })
    }
  }

  render() {
    const { savedStage } = this.state
    const { updatingGame, nameOfGame, id } = this.props;
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
          <RequiredStageFields updatingGame={updatingGame} params={savedStage ? savedStage.name :  this.props.params.name} stageDetails={savedStage === undefined ? emptyObject : savedStage} />
        </form>
        <br/>
        <HintsContainer stageId={savedStage === undefined ? emptyId : savedStage._id} />
        { updatingGame ? <Link to={'/update-game/' + nameOfGame}><button className="btn btn-primary" onClick={this.saveStageDetails.bind(this)}>Go Back to Game</button></Link> : null }
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
