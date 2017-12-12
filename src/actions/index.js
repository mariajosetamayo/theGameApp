import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

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
        browserHistory.push('/feature');
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
        browserHistory.push('/feature');
        // browserHistory.push('/feature');
      })
      .catch( response => dispatch(authError(response.data.error)));
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
