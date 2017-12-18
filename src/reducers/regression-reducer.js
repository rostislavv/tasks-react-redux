import {
  LOAD_REGRESSION,
  LOAD_REGRESSION_SUCCESS,
  LOAD_REGRESSION_FAIL
} from '../actions/regression-actions';

export default (state = {
  error: false,
  loading: false,
  regression: []
}, action) => {
  switch (action.type) {
    case LOAD_REGRESSION:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOAD_REGRESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        regression: action.data
      };
    case LOAD_REGRESSION_FAIL:
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
