import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CURRENT_CHANGE,
  CURRENT_SET,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAIL,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL
} from '../actions/task-actions';
const initialTask = {
    performer: '',
    state: '',
    description: ''
}
export default (state = {
  error: false,
  loading: false,
  task: {},
  modal_open: false,
  modal_mode: 'add',
}, action) => {
  switch (action.type) {
    case EDIT_TASK:
    case DELETE_TASK:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case EDIT_TASK_FAIL:
    case DELETE_TASK_FAIL:
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
        modal_mode: action.mode,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modal_open: false,
        modal_mode: 'add',
      }
    case CURRENT_CHANGE:
      state.task[action.prop] = action.val;
      return {
        ...state,
      }
    case CURRENT_SET:
      const newTask = _.isUndefined(action.task) ? _.clone(initialTask) : action.task;
      return {
        ...state,
        task: newTask
      }
    default:
      return state;
  }
};
