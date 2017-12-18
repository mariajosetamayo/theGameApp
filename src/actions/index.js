import axios from 'axios';
import { browserHistory } from 'react-router';

import {AUTH_USER,
        AUTH_ERROR,
        UNAUTH_USER,
        STORE_STAGE_DETAILS,
        FETCHED_STAGE_DETAILS,
        FETCH_STAGE_DETAILS} from './types';

const ROOT_URL = 'http://localhost:1515'

export function signinUser({username, password}){
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signIn`, { name: username, password })
      .then(response => {
        console.log('RESPONSE FROM SIGIN', response.data)
        dispatch({
          type: AUTH_USER
        });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/home');
      })
      .catch(() => {
        dispatch(authError('Bad login info'));
      });
  }
}

export function signupUser({username, email, password}){
  console.log('THIS IS WHAT WE ARE SENDING', username)
  return function(dispatch) {
    axios.post(`${ROOT_URL}/createUser`, { name: username, email, password })
      .then(response => {
        console.log('this is the response', response)
        dispatch({
          type: AUTH_USER
        });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/home');
        // browserHistory.push('/feature');
      })
      .catch( response => dispatch(authError('User already exists')));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log(response);
    })
  }
}

export function createStage(stage) {
  const authorizationHeaders= {headers: {authorization: localStorage.getItem('token')}}
  return function(dispatch) {
    axios.post(`${ROOT_URL}/createStage`,
      {name: stage.name, content: stage.content, instructions: stage.instructions,
        answer: stage.answer, percentageDeductionPerWrongAnswer: stage.percentageDeductionPerWrongAnswer,
        requirements: stage.requirements, timeUntilOneTenthDeduction: stage.timeUntilOneTenthDeduction
      },
      authorizationHeaders)
    .then(response => {
      // console.log('this is the repsonse for create stage', response)
      dispatch({
        type: FETCHED_STAGE_DETAILS,
        payload: response.data
      });
      browserHistory.push('/stage/' + response.data.name);
    })
  }
}

export function storeStageDetails(stageValues) {
  console.log('this is what we are getting in action to store details', stageValues)
  return {
    type: STORE_STAGE_DETAILS,
    payload: {name: stageValues.name, content: stageValues.content,
      instructions: stageValues.instructions, answer: stageValues.answer,
      timeUntilOneTenthDeduction: stageValues.timeUntilOneTenthDeduction,
      requirements: stageValues.requirements, percentageDeductionPerWrongAnswer: stageValues.percentageDeductionPerWrongAnswer
    }
  }
}

export function fetchStageDetails(name) {
  console.log('calling action to fetch stage', name)
  const authorizationHeaders= {headers: {authorization: localStorage.getItem('token')}}
  return function(dispatch) {
    axios.get(`${ROOT_URL}/readStage/` + name, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('this is the repsonse for create stage', response)
      dispatch({
        type: FETCH_STAGE_DETAILS,
        payload: response.data
      });
    })
  }
}

export function editStageDetails(name, updatedDetails) {
  const authorizationHeaders= {headers: {authorization: localStorage.getItem('token')}}
  return function(dispatch) {
    axios.put(`${ROOT_URL}/updateStage/` + name,
      {name: updatedDetails.name, content: updatedDetails.content, instructions: updatedDetails.instructions,
        answer: updatedDetails.answer, percentageDeductionPerWrongAnswer: updatedDetails.percentageDeductionPerWrongAnswer,
        requirements: updatedDetails.requirements, timeUntilOneTenthDeduction: updatedDetails.timeUntilOneTenthDeduction},
        authorizationHeaders
    )
    .then(response => {
      browserHistory.push('/home');
    })
  }
}

export function createHint(hint){
  const authorizationHeaders= {headers: {authorization: localStorage.getItem('token')}}
  return function(dispatch) {
    axios.post(`${ROOT_URL}/createHint`,
      {text: hint.text, percentDeductionIfUsed: hint.percentDeductionIfUsed, stage: hint.stage},
        authorizationHeaders
    )
    .then(response => {
      console.log('this is the response from hint', response)
    })
  }
}
