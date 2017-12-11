import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:1515'

export function signinUser({email, password}){
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signIn`, { name: email, password })
      .then(response => {
        browserHistory.push('/feature');
      })
      .catch(() => {

      });
  }
}

export function signupUser({username, email, password}){
  console.log('THIS IS WHAT WE ARE SENDING', username)
  return function(dispatch) {
    axios.post(`${ROOT_URL}/createUser`, { name: username, email, password })
      .then(response => {
        console.log('this is the response', response)
        dispatch({ type: AUTH_USER });
        localStorage.setItm('token', response.data.token);
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
