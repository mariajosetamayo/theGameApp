import React, { Component } from 'react';
import {connect} from 'react-redux';
import scrollintoview from 'scroll-into-view';

import * as actions from '../../actions';
import Hint from './hint';

export class HintsContainer extends Component {
  constructor(props){
    super(props);
    this.state= {
      numberOfHints: 0
    };
    this.addHint = this.addHint.bind(this);
  }

  addHint(e) {
    e.preventDefault();
    this.setState({
      numberOfHints: this.state.numberOfHints + 1
    });
    let element = document.getElementById('addHint');
    scrollintoview(element);
  }

  render() {
    console.log('props in hint', this.state)
    //TODO: transfer styles to individual css files.

    const textareaStyle={
      width: '100%'
    };

    const hints= [];

    for(var i = 0; i < this.state.numberOfHints; i ++){
      hints.push(<div key={i} id={'div'+i}><Hint stage={this.props.stageId} /></div>)
    };
    console.log('HINTS', hints)
    return (
      <div>
        <div>
          {hints}
        </div>
        <p><a id='addHint' onClick={this.addHint} className='btn btn-success'>Add Hint</a></p>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { stageDetails: state.app.stageValues };
}

export default connect(mapStateToProps)(HintsContainer)
