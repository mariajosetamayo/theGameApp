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
    console.log('this is the event', e.target.id)
    e.preventDefault();
    this.setState({
      numberOfHints: this.state.numberOfHints + 1
    });
    // let element = this.refs['row' + e.target.value].getDOMNode()
    // let element = document.getElementById('div' + e.target.id);
    // let element = this.e.target.value
    // console.log('this is the element', element)
    // scrollintoview(element);
    this.scrollToHint(e)
  }

  scrollToHint (e){
    console.log('EVENT IN CALLBACK', e.target.id)
    // let id= 'div' e.target.id
    let element = document.getElementById('div' + e.target.id);
    console.log('this is the element', element);
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
        <p><a onClick={this.addHint} id={this.state.numberOfHints}  className='btn btn-success'>Add Hint</a></p>
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
