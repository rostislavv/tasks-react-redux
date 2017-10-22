import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import { encodeParams } from '../lib/encode';
import { fetchTasks } from './tasks-actions';

export const SAVE_TASK = 'SAVE_TASK';
export const SAVE_TASK_SUCCESS = 'SAVE_TASK_SUCCESS';
export const SAVE_TASK_FAIL= 'SAVE_TASK_FAIL';

export const EDIT_TASK = 'EDIT_TASK';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const EDIT_TASK_FAIL = 'EDIT_TASK_FAIL';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAIL = 'DELETE_TASK_FAIL';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const CURRENT_CHANGE = 'CURRENT_CHANGE';
export const CURRENT_SET = 'CURRENT_SET';

//action creators
const loadTaskFailAbstract = (type) => (err) => (
  {
    type: type,
    code: err.res ? err.res.body.code : err.status,
    message: err.res ? err.res.body.code : err.message,
  }
)

export const saveTask = () => ({ type: SAVE_TASK })
export const saveTaskSuccess = () => ({ type: SAVE_TASK_SUCCESS })
export const saveTaskFail = loadTaskFailAbstract(SAVE_TASK_FAIL)

export const editTask = () => ({ type: EDIT_TASK });
export const editTaskSuccess = () => ({ type: EDIT_TASK_SUCCESS });
export const editTaskFail = loadTaskFailAbstract(EDIT_TASK_FAIL);

export const deleteTask = () => ({type: DELETE_TASK});
export const deleteTaskSuccess = () => ({type: DELETE_TASK_SUCCESS});
export const deleteTaskFail = loadTaskFailAbstract(DELETE_TASK_FAIL);

//mode - add OR edit
export const openModal = (mode) => ({ type: OPEN_MODAL, mode})
export const closeModal = () => ({ type: CLOSE_MODAL })
export const currentChange = (prop, val) => ({
    type: CURRENT_CHANGE,
    prop,
    val
  })
export const currentSet = (task) => ({
  type: CURRENT_SET,
  task
})

export function fetchSaveTask(body) {
  return dispatch => {
    dispatch(saveTask())
    return fetch('/api/tasks', {
      method: 'POST',
      type: 'form',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body : encodeParams(body),
    })
    .then(response => response.json())
    .then(res => {
      if(_.has('code') && res.code === 401){
        dispatch(saveTaskFail(res))
      } else {
        dispatch(saveTaskSuccess(res))
        dispatch(fetchTasks())
      }
    })
    .catch(err => dispatch(saveTaskFail(err)))
  }
}

export function fetchEditTask(id, body) {
  const route = '/api/tasks/' + id;
  return dispatch => {
    dispatch(editTask())
    fetch(route, {
      method: 'POST',
      type: 'form',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body : encodeParams(body),
    })
    .then(response => response.json())
    .then(res => {
      if(_.has('code') && res.code === 401){
        dispatch(editTaskFail(res))
      } else {
        dispatch(editTaskSuccess(res))
        dispatch(fetchTasks())
      }
    })
  }
}

export function fetchDeleteTask(id) {
  const route = '/api/tasks/' + id;
  return dispatch => {
    dispatch(deleteTask())
    return fetch(route, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(res => {
      if(_.has('code') && res.code === 401){
        dispatch(deleteTaskFail(res))
      } else {
        dispatch(deleteTaskSuccess(res))
        dispatch(fetchTasks())
      }
    })
    .catch(err => dispatch(deleteTaskFail(err)))
  }
}
