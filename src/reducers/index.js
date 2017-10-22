import {combineReducers} from 'redux';
import people from './people-reducer.js';
import reddit from './reddit-reducer.js';
import auth from './auth-reducer.js';

const rootReducer = combineReducers({
  auth,
  people,
  
});

export default rootReducer;
