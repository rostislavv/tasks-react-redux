import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const LOAD_TASKS = 'LOAD_TASKS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const LOAD_TASKS_FAIL= 'LOAD_TASKS_FAIL';

//action creators
export function loadTasksActionCreator(){
  return {
    type: LOAD_TASKS
  }
}
export function loadTasksSucessActionCreator(tasks){
  return {
    type: LOAD_TASKS_SUCCESS,
    tasks
  }
}

export function loadTasksFailActionCreator(err) {
  return {
    type: LOAD_TASKS_FAIL,
    code: err.res ? err.res.body.code : err.status,
    message: err.res ? err.res.body.code : err.message,
  }
}

export function fetchTasks() {
  return dispatch => {
    dispatch(loadTasksActionCreator())
    return fetch('/api/tasks', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      if(_.has('code') && res.code === 401){
        dispatch(loadTasksFailActionCreator(res))
      } else {
        dispatch(loadTasksSucessActionCreator(res))
      }
    })
    .catch(err => dispatch(loadTasksFailActionCreator(err)))
  }
}
