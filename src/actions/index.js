import axios from 'axios';
import { browserHistory } from 'react-router';

import {AUTH_USER,
        AUTH_ERROR,
        UNAUTH_USER,
        STORE_STAGE_DETAILS,
        FETCHED_STAGE_DETAILS,
        FETCH_STAGE_DETAILS,
        FETCH_SEARCH_USER_RESULTS,
        FETCH_SEARCH_GAME_RESULTS,
        FETCH_SEARCH_STAGE_RESULTS,
        CREATE_GAME_INSTANCE_AND_REDIRECT,
        CLEAR_TEAM,
        ADD_USER_TO_TEAM,
        GO_TO_FIRST_STAGE,
        GO_TO_NEXT_STAGE,
        FINALIZE_GAME,
        UPDATE_STAGE_INSTANCE} from './types';

const ROOT_URL = 'http://localhost:1515';

export function checkHint (hints, time, stageInstance) {
  return function (dispatch) {
    axios.put(
      `${ROOT_URL}/updateStageInstance/${stageInstance._id}`,
      { hintsUsed: hints, time },
      {headers: {authorization: localStorage.getItem('token')}}
    ).then(response => {
      dispatch({
        type: UPDATE_STAGE_INSTANCE,
        payload: response.data,
      });
    })
  }
}

export function submitAnswer (answers, time, stageInstance) {
  return function (dispatch) {
    axios.put(
      `${ROOT_URL}/updateStageInstance/${stageInstance._id}`,
      { answers, time },
      {headers: {authorization: localStorage.getItem('token')}}
    ).then(response => {
      // this line means it's returned a finalized gameInstance so game is over, so in that case redirect to game stats page
      if (response.data.finalized) {
        dispatch({
          type: FINALIZE_GAME,
          payload: response.data,
        });
        browserHistory.push(`/finished-games/${response.data._id}`);
      // otherwise we need to redirect to the next stage
      } else if (response.data._id === stageInstance._id) {
        dispatch({
          type: UPDATE_STAGE_INSTANCE,
          payload: response.data,
        });
      } else {
        axios.get(
          `${ROOT_URL}/readGameInstance/${stageInstance.gameInstance}`,
          {headers: {authorization: localStorage.getItem('token')}}
        ).then(responseGameInstance => {
          const nextStageId = responseGameInstance.data.stages[responseGameInstance.data.stages.indexOf(stageInstance.stage) + 1]
          axios.get(
            `${ROOT_URL}/readStageById/${nextStageId}`,
            {headers: {authorization: localStorage.getItem('token')}}
          ).then(responseStage => {
            axios.post(
              `${ROOT_URL}/readStageInstance`,
              { gameInstance: stageInstance.gameInstance, stage: nextStageId },
              {headers: {authorization: localStorage.getItem('token')}}
            ).then(responseStageInstance => {
              dispatch({
                type: GO_TO_NEXT_STAGE,
                payload: {
                  latestStageInstance: responseStageInstance.data,
                  latestStage: responseStage.data,
                },
              });
              browserHistory.push(`/play-game/${stageInstance.gameInstance}/${responseStageInstance.data._id}`);
            })
          })
        })
      }
    })
  };
}

export function finalizeStageBecauseOfTime (time, stageInstance) {
  return function (dispatch) {
    axios.put(
      `${ROOT_URL}/updateStageInstance/${stageInstance._id}`,
      { finalized: true, time: time },
      {headers: {authorization: localStorage.getItem('token')}}
    ).then(response => {
      // this line means it's returned a finalized gameInstance so game is over, so in that case redirect to game stats page
      if (response.data.finalized) {
        dispatch({
          type: FINALIZE_GAME,
          payload: response.data,
        });
        browserHistory.push(`/finished-games/${response.data._id}`);
      // otherwise we need to redirect to the next stage
      } else {
        axios.get(
          `${ROOT_URL}/readGameInstance/${stageInstance.gameInstance}`,
          {headers: {authorization: localStorage.getItem('token')}}
        ).then(responseGameInstance => {
          const nextStageId = responseGameInstance.data.stages[responseGameInstance.data.stages.indexOf(stageInstance.stage) + 1]
          axios.get(
            `${ROOT_URL}/readStageById/${nextStageId}`,
            {headers: {authorization: localStorage.getItem('token')}}
          ).then(responseStage => {
            axios.post(
              `${ROOT_URL}/readStageInstance`,
              { gameInstance: stageInstance.gameInstance, stage: nextStageId },
              {headers: {authorization: localStorage.getItem('token')}}
            ).then(responseStageInstance => {
              dispatch({
                type: GO_TO_NEXT_STAGE,
                payload: {
                  latestStageInstance: responseStageInstance.data,
                  latestStage: responseStage.data,
                },
              });
              browserHistory.push(`/play-game/${stageInstance.gameInstance}/${responseStageInstance.data._id}`);
            })
          })
        })
      }
    })
  };
};

export function goToFirstStage (firstStageId, gameInstanceId) {
  return function (dispatch) {
    axios.get(
      `${ROOT_URL}/readStageById/${firstStageId}`,
      {headers: {authorization: localStorage.getItem('token')}}
    ).then(responseStage => {
      axios.post(
        `${ROOT_URL}/readStageInstance`,
        { gameInstance: gameInstanceId, stage: firstStageId },
        {headers: {authorization: localStorage.getItem('token')}}
      ).then(responseStageInstance => {
        dispatch({
          type: GO_TO_FIRST_STAGE,
          payload: {
            latestStageInstance: responseStageInstance.data,
            latestStage: responseStage.data,
          },
        });
        browserHistory.push(`/play-game/${gameInstanceId}/${responseStageInstance.data._id}`);
      });
    });
  };
};

export function clearTeam () {
  return function (dispatch) {
    dispatch({
      type: CLEAR_TEAM,
      payload: [],
    });
  }
}

export function addUserToTeam (latestTeam) {
  return function (dispatch) {
    dispatch({
      type: ADD_USER_TO_TEAM,
      payload: latestTeam,
    });
  }
}

export function createGameInstanceAndRedirect (gameId, team) {
  return function (dispatch) {
    axios.post(
      `${ROOT_URL}/createGameInstance`,
      { team, game: gameId },
      {headers: {authorization: localStorage.getItem('token')}}
    ).then(response => {
      dispatch({
        type: CREATE_GAME_INSTANCE_AND_REDIRECT,
        payload: response.data,
      });
      browserHistory.push(`/play-game/${response.data._id}`);
    })
  };
};

export function search (type, text) {
  return function (dispatch) {
    axios.post(
      `${ROOT_URL}/search${type.charAt(0).toUpperCase() + type.slice(1)}s`,
      { text },
      {headers: {authorization: localStorage.getItem('token')}})
      .then(response => {
        let resultingType
        if (type === 'user') {
          resultingType = FETCH_SEARCH_USER_RESULTS;
        } else if (type === 'game') {
          resultingType = FETCH_SEARCH_GAME_RESULTS;
        } else {
          resultingType = FETCH_SEARCH_STAGE_RESULTS;
        };
        if (text !== '') {
          dispatch({
            type: resultingType,
            payload: response.data.results,
          });
        } else {
          dispatch({
            type: resultingType,
            payload: [],
          });
        };
      }
    )
  };
};

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

export function createGame(name){
  const authorizationHeaders= {headers: {authorization: localStorage.getItem('token')}}
  return function(dispatch) {
    axios.post(`${ROOT_URL}/createGame`,
      {name}, authorizationHeaders
    )
    .then(response => {
      console.log('this is the response from hint', response)
    })
  }
}
