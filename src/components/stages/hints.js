import React, { Component } from 'react';

export default class Hints extends Component {
  constructor(props){
    super(props);
  }

  onCreateHintClick(e) {
    e.preventDefault();
    const hintValues={
      text: this.hintDetails.value,
      percentDeductionIfUsed: this.deduction.value,
      stage: this.props.stageId
    }
    console.log('these are the hint values', hintValues)
    this.props.dispatch(
      actions.createHint(hintValues)
    )
  }


  render() {
    console.log('props in hints', this.props)
    return (
      <div>
        <p><a href="#" onClick={props.addChild}>Add Another Child Component</a></p>
        <div id="children-pane">
         {this.props.children}
        </div>
      </div>
    );
  }
}
