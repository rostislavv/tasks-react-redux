import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
} from '../actions/auth-actions';

export default (state = {
  error: false,
  loading: false,
  message: null,
}, action) => {
  let message;
  if (action.payload) {
    message = action.payload.message;
  }
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        message,
      };
    case LOGOUT:
      if (message) {
        return {
          ...state,
          error: true,
          loading: true,
          message,
        };
      }
      return state;
    case LOGOUT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        message
      }
    default:
      return state;
  }
};
