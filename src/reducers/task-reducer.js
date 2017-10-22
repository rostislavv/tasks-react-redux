import {
  LOAD_TASK,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_FAIL,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/task-actions';

export default (state = {
  error: false,
  loading: false,
  task: {},
  modal_open: false,
  modal_mode: 'add'
}, action) => {
  switch (action.type) {
    case LOAD_TASK:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOAD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.task
      };
    case LOAD_TASK_FAIL:
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
        modal_mode: action.mode
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modal_open: false,
        modal_mode: 'add'
      }
    default:
      return state;
  }
};
