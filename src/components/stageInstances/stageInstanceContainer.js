import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

export class GameInstanceContainer extends Component {
  constructor(props) {
    super(props);
    const hints = {}
    this.props.stage.hints.forEach(hint => {
      hints[hint] = {
        text: '',
        used: false,
      }
    })
    this.state = {
      hints,
      startTime: new Date(),
      answer: '',
    };
  }

  handleAnswerChange(e) {
    this.setState({ answer: e.target.value });
  }

  submitAnswer(e) {
    e.preventDefault();
    const secondsTaken = ((new Date()) - this.state.startTime) / 1000;
    if (this.props.timeUntilOneTenthDeduction > 0 && secondsTaken >= (this.props.timeUntilOneTenthDeduction * 10)) {
      this.finalizeGame()
    } else {
      console.log("submitted answer!!! ", this.state.answer)
      this.setState({ answer: '' });
    };
  }

  checkHint(e) {
    // some stuff to update stageInstance
    e.preventDefault()
    const secondsTaken = ((new Date()) - this.state.startTime) / 1000;
    if (this.props.timeUntilOneTenthDeduction > 0 && secondsTaken >= (this.props.timeUntilOneTenthDeduction * 10)) {
      this.finalizeGame()
    } else {
      const hintId = e.target.id
      axios.get(
        `http://localhost:1515/readHint/${hintId}`,
        {headers: {authorization: localStorage.getItem('token')}}
      ).then(response => {
        console.log("getting response ", response.data)
        let hints = this.state.hints;
        hints[hintId].text = response.data.text;
        hints[hintId].used = true;
        this.setState({
          hints,
        });
      });
    };
  }

  render() {
    console.log("THE PROPS IN STAGEINSTANCE CONTAINER ARE: ", this.props)
    console.log("THE STATE IS ", this.state)
    const stage = {
      position: 'relative',
      top: '300px',
    };

    function hintButtonStyle (used) {
      return {
        display: used ? 'none' : 'block',
        padding: '20px',
        borderRadius: '3px',
        border: '1px solid green',
        width: 'fit-content',
      };
    };

    function hintTextStyle (used) {
      return {
        display: !used ? 'none' : 'block',
      };
    };
    return (
      <div style={stage}>
        <p>{this.props.stage.content}</p><br/>
        {this.props.stage.hints.map((hint, hintNumber) => {
          return (
            <div key={hintNumber}>
              <p style={hintTextStyle(this.state.hints[hint].used)}>
                Hint: {this.state.hints[hint].text}
              </p>
              <span id={hint} value={hint} key={hint} style={hintButtonStyle(this.state.hints[hint].used)} onClick={this.checkHint.bind(this)}>{`Show hint ${hintNumber + 1}`}</span>
            </div>
          )
        })}
        <br/>
        <form onSubmit={this.submitAnswer.bind(this)}>
          <label>
            Enter your answer here:
            <br/>
            <input type='text' value={this.state.answer} onChange={this.handleAnswerChange.bind(this)} />
          </label><br/>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  };
};

function mapStateToProps (state) {
  return {
    gameInstance: state.app.latestGameInstance,
    stageInstance: state.app.latestStageInstance,
    stage: state.app.latestStage,
  };
};

export default connect(mapStateToProps)(GameInstanceContainer);
