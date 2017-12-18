import React, { Component } from 'react';
import {connect} from 'react-redux';
import scrollintoview from 'scroll-into-view';

import * as actions from '../../actions';
import Hint from './hint';

const hints= [];

export class HintsContainer extends Component {
  constructor(props){
    super(props);
    this.state= {
      numberOfHints: 0
    };
    this.addHint = this.addHint.bind(this);
  }

  addHint(e) {
    console.log('this is the event', e.target.value)
    e.preventDefault();
    this.setState({
      numberOfHints: this.state.numberOfHints + 1
    });
    let element = document.getElementById('div' + e.target.value)
    // let element = this.e.target.value
    console.log('this is the element', element)
    scrollintoview(element)
  }

  render() {
    console.log('props in hint', this.props)
    //TODO: transfer styles to individual css files.

    const textareaStyle={
      width: '100%'
    };



    for(var i = 0; i < this.state.numberOfHints; i ++){
      hints.push(<div key={i + 1} id={'div' + i}><Hint stage={this.props.stageId} key={i} number={i}/></div>)
    };

    return (
      <div>
        <p><a onClick={this.addHint} value={'div' + hints.length}  className='btn btn-success'>Add Hint</a></p>
        <div>
          {hints}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { stageDetails: state.app.stageValues };
}

export default connect(mapStateToProps)(HintsContainer)
