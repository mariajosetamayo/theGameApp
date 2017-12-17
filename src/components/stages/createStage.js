import React, { Component } from 'react';
import {connect} from 'react-redux';

import RequiredStageFields from './requiredFields';
import * as actions from '../../actions';

export class CreateStage extends Component {

  constructor(props){
    super(props);
    // this.onCreateStageClick = this.onCreateStageClick.bind(this);
  }

  // onCreateStageClick (){
  //   const stage = {
  //
  //   }
  //   this.props.dispatch(
  //     actions.createStage(stage)
  //   )
  // }
  render() {

    //TODO: transfer styles to individual css files.

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
        <RequiredStageFields />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default connect(null)(CreateStage)
