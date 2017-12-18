import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const LOAD_REGRESSION = 'LOAD_REGRESSION';
export const LOAD_REGRESSION_SUCCESS = 'LOAD_REGRESSION_SUCCESS';
export const LOAD_REGRESSION_FAIL= 'LOAD_REGRESSION_FAIL';

//action creators
export function loadRegressionActionCreator(){
  return {
    type: LOAD_REGRESSION
  }
}
export function loadRegressionSucessActionCreator(data){
  return {
    type: LOAD_REGRESSION_SUCCESS,
    data
  }
}

export function loadRegressionFailActionCreator(err) {
  return {
    type: LOAD_REGRESSION_FAIL,
    code: err.res ? err.res.body.code : err.status,
    message: err.res ? err.res.body.code : err.message,
  }
}

export function fetchRegression() {
  return dispatch => {
    dispatch(loadRegressionActionCreator())
    return fetch('/api/regression', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      if(_.has('code') && res.code === 401){
        dispatch(loadRegressionFailActionCreator(res))
      } else {
        dispatch(loadRegressionSucessActionCreator(res))
      }
    })
    .catch(err => dispatch(loadRegressionFailActionCreator(err)))
  }
}
