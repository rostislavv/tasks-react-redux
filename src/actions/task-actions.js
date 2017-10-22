import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const LOAD_TASK = 'LOAD_TASK';
export const LOAD_TASK_SUCCESS = 'LOAD_TASK_SUCCESS';
export const LOAD_TASK_FAIL= 'LOAD_TASK_FAIL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

//action creators
export const loadTask = () => ({ type: LOAD_TASK })
export const loadTaskSucess = (task) => ({ type: LOAD_TASK_SUCCESS, task })
export const loadTaskFail = (err) => (
  {
    type: LOAD_TASK_FAIL,
    code: err.res ? err.res.body.code : err.status,
    message: err.res ? err.res.body.code : err.message,
  }
)
//mode - add OR edit
export const openModal = (mode) => ({ type: OPEN_MODAL, mode})
export const closeModal = () => ({ type: CLOSE_MODAL })

export function fetchTask(id) {
  return dispatch => {
    dispatch(loadTask())
    return fetch('/api/tasks/:id', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      if(_.has('code') && res.code === 401){
        dispatch(loadTaskFail(res))
      } else {
        dispatch(loadTaskSucess(res))
      }
    })
    .catch(err => dispatch(loadTaskFail(err)))
  }
}
