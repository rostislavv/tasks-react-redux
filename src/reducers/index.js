import {combineReducers} from 'redux';
import auth from './auth-reducer.js';
import tasks from './tasks-reducer.js';
import task from './task-reducer.js';

const rootReducer = combineReducers({
  auth,
  tasks,
  task
});

export default rootReducer;
