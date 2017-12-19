import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../actions';

export class Hint extends Component {
  constructor(props){
    super(props);
    this.onCreateHintClick = this.onCreateHintClick.bind(this);
  }

  onCreateHintClick(e) {
    e.preventDefault();
    const hintValues={
      text: this.hintDetails.value,
      percentDeductionIfUsed: this.deduction.value,
      stage: this.props.stage
    };
    console.log('these are the hint values', hintValues)
    this.props.dispatch(
      actions.createHint(hintValues)
    );
  }


  render() {
    console.log('props in hint', this.props);
    //TODO: transfer styles to individual css files.

    const textareaStyle={
      width: '100%'
    };

    return (
      <div className='jumbotron'>
        <div className="form-group">
          <label>Hint</label>
          <br/>
          <textarea required="true" ref = {ref => this.hintDetails = ref} style={textareaStyle} className="form-control" rows="5"  placeholder='Ex. I’m tall when I’m young and I’m short when I’m old. What am I?'></textarea>
        </div>
        <div className="form-group">
          <label>Percentage deduction is used</label>
          <input ref = {ref => this.deduction = ref} type="text" className="form-control" id="stageName" placeholder="Ex. 10%" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.onCreateHintClick}>Add</button>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { stageDetails: state.app.stageValues };
}

export default connect(mapStateToProps)(Hint);
