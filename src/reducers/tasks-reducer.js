import {
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL
} from '../actions/tasks-actions';

export default (state = {
  error: false,
  loading: false,
  tasks: []
}, action) => {
  switch (action.type) {
    case LOAD_TASKS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.tasks
      };
    case LOAD_TASKS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message
      };
    default:
      return state;
  }
};
