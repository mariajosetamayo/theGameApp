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
      answers: [],
    };
  }

  finalizeStage(time, stageInstanceId) {
    this.props.dispatch(actions.finalizeStageBecauseOfTime(time, stageInstance));
  }

  handleAnswerChange(e) {
    this.setState({ answer: e.target.value });
  }

  submitAnswer(e) {
    e.preventDefault();
    const secondsTaken = ((new Date()) - this.state.startTime) / 1000;
    const stageInstance = this.props.stageInstance
    if (this.props.timeUntilOneTenthDeduction > 0 && secondsTaken >= (this.props.timeUntilOneTenthDeduction * 10)) {
      this.finalizeStage(secondsTaken, stageInstance)
    } else {
      const answers = this.state.answers;
      answers.push(this.state.answer);
      this.setState({ answers });
      this.props.dispatch(actions.submitAnswer(answers, secondsTaken, stageInstance));
      this.setState({ answer: '' });
    };
  }

  checkHint(e) {
    e.preventDefault()
    const secondsTaken = ((new Date()) - this.state.startTime) / 1000;
    const stageInstance = this.props.stageInstance
    if (this.props.timeUntilOneTenthDeduction > 0 && secondsTaken >= (this.props.timeUntilOneTenthDeduction * 10)) {
      this.finalizeStage(secondsTaken, stageInstance)
    } else {
      const hintId = e.target.id
      axios.get(
        `http://localhost:1515/readHint/${hintId}`,
        {headers: {authorization: localStorage.getItem('token')}}
      ).then(response => {
        let hints = this.state.hints;
        hints[hintId].text = response.data.text;
        hints[hintId].used = true;
        this.setState({
          hints,
        });
        const hintsUsed = []
        // makes sure we pass the hints in the right order
        this.props.stage.hints.forEach(hint => {
          for (let id in hints) {
            if (id === hint && hints[id].used) {
              hintsUsed.push(hint)
            }
          }
        })
        this.props.dispatch(actions.checkHint(hintsUsed, secondsTaken, stageInstance));
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.stage._id !== nextProps.stage._id) {
      const hints = {}
      nextProps.stage.hints.forEach(hint => {
        hints[hint] = {
          text: '',
          used: false,
        }
      })
      this.setState({
        hints,
        startTime: new Date(),
        answer: '',
        answers: [],
      });
    }
  }

  render() {
    const stage = {
      position: 'relative',
      top: '300px',
      fontFamily: 'cursive',
    };

    function hintButtonStyle (used) {
      return {
        display: used ? 'none' : 'block',
        padding: '5px',
        borderRadius: '3px',
        border: '1px solid green',
        width: 'fit-content',
        fontSize: '20px',
        cursor: 'pointer',
      };
    };

    function hintTextStyle (used) {
      return {
        display: !used ? 'none' : 'block',
      };
    };
    const background = {
      position: 'fixed',
      height: '100%',
      width: '100%',
      backgroundImage: "url('http://2.bp.blogspot.com/-yMZWhmgr2IM/URPUVTLQl7I/AAAAAAAAkyE/DdOjvCqpPD4/s1600/oldpaper-backgroundfairy.jpg')",
      zIndex: '-100',
      top: '0',
      left: '0',
    };
    const content = {
      fontSize: '25px',
    };
    const label = {
      fontSize: '25px',
    };
    const submit = {
      border: '1px solid darkred',
      borderRadius: '3px',
      height: '75px',
      width: '175px',
      fontSize: '35px',
      backgroundColor: 'transparent',
      color: 'darkred',
    };
    const input = {
      borderRadius: '5px',
      borderStyle: 'solid',
      border: '1px black',
    };
    return (
      <div style={stage}>
        <div style={background}></div>
        <p style={content}>{this.props.stage.content}</p><br/>
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
          <label style={label}>
            Enter your answer here:
            <br/>
            <input style={input} type='text' value={this.state.answer} onChange={this.handleAnswerChange.bind(this)} />
          </label><br/>
          <input style={submit} type='submit' value='Submit' />
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
