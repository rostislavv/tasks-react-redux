import fetch from 'isomorphic-fetch'
import { clearCookie } from '../lib/auth';
//import history from '../lib/history';
//history.push('/');

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
//action creators

export function loginActionCreator(username, password){
  return {
    type: LOGIN,
    grant_type: 'password',
    username: username,
    password: password
  }
}
export function loginSuccessActionCreator(username){
  return {
    type: LOGIN_SUCCESS,
    username: username
  }
}

export function loginFailedActionCreator(err) {
  return {
    type: LOGIN_FAILED,
    code: err.res ? err.res.body.code : err.status,
    message: err.res ? err.res.body.code : err.message,
  }
}

export function logoutActionCreator() {
  return {
    type: LOGOUT
  }
}
export function logoutSuccessActionCreator(message){
  return {
    type: LOGOUT_SUCCESS,
    message
  }
}

export function logoutFailedActionCreator(message) {
  return {
    type: LOGOUT_FAILED,
    message
  }
}


const encodeParams = params => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

// TODO - USE HERE FAIL ACTION CREATORS???
export function fetchLogin(username, password) {
  return dispatch => {
    dispatch(loginActionCreator(username, password))
    return fetch('/api/login', {
      method: 'POST',
      type: 'form',
      credentials: 'same-origin',
      //mode: 'cors',
      headers: {
        Authorization: 'Basic ANsdf23fvjbggy2345opx3[s23d4v4ji',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body : encodeParams({username: username, password: password}),
    })
    .then(response => response.json())
    .then(({ username }) => dispatch(loginSuccessActionCreator(username)))
    .catch(err => dispatch(loginFailedActionCreator(err)))
  }
}

export function fetchLogout() {
  return dispatch => {
    dispatch(logoutActionCreator())
    return fetch('/api/logout', {
      credentials: 'same-origin',
      method: 'GET',
    })
    .then(response => response.json())
    .then(({ message }) => {
      dispatch(logoutSuccessActionCreator(message));
    });
  }
}
