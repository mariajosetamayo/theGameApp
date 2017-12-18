import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';


export class StagesContainer extends Component {

  // componentWillMount() {
  //   this.props.dispatch(
  //     actions.fetchStageDetails(this.props.params.name)
  //   )
  // }

  render() {

    return (
      <div></div>
    );
  }
}

function mapStateToProps (state) {
  return {
    stage: state.app.createdStage,
    savedStage: state.app.stage
  };
}

export default connect(mapStateToProps)(StagesContainer)
