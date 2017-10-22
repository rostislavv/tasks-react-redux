import fetch from 'isomorphic-fetch';
import { encodeParams } from '../lib/encode';

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

export function loginFailedActionCreator(message) {
  return {
    type: LOGIN_FAILED,
    message
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


export function fetchLogin(username, password) {
  return dispatch => {
    dispatch(loginActionCreator(username, password))
    return fetch('/api/login', {
      method: 'POST',
      type: 'form',
      credentials: 'same-origin',
      headers: {
        Authorization: 'Basic ANsdf23fvjbggy2345opx3[s23d4v4ji',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body : encodeParams({username: username, password: password}),
    })
    .then(response => {
      console.log('response', response);
      if(!response.ok){
        throw Error(response.statusText);
      } else {
         response.json()
      }
    })
    .then(({ username }) => dispatch(loginSuccessActionCreator(username)))
    .catch(err => dispatch(loginFailedActionCreator(err.message)))
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
