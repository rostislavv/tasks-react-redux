import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const LOAD = 'users/LOAD';
export const LOAD_SUCCESS = 'users/LOAD_SUCCESS';
export const LOAD_FAIL= 'users/LOAD_FAIL';

export const OPEN_MODAL = "users/OPEN_MODAL";
export const CLOSE_MODAL = "users/CLOSE_MODAL";

export const load = () => ({ type : LOAD });
export const loadSuccess = (data) => ({ type: LOAD_SUCCESS, data })
export const loadFail = () => ({ type: LOAD_FAIL, data })

export const openModal = (mode) => ({ type: OPEN_MODAL, mode})
export const closeModal = () => ({ type: CLOSE_MODAL })



export function fetchUsers() {
  return dispatch => {
    dispatch(load())
    return fetch('/api/users', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      if(_.has('code') && res.code === 401){
        dispatch(loadFail(res))
      } else {
        dispatch(loadSuccess(res))
      }
    })
    .catch(err => dispatch(loadFail(err)))
  }
}


export default (state = {
  error: false,
  loading: false,
  users: [],
  modal_open: false
}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        error: false,
        users: []
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message
      };
    case OPEN_MODAL:
      return {
        ...state,
        modal_open: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modal_open: false,
      }
    default:
      return state;
  }
};
