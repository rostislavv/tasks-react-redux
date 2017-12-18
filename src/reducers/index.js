import {combineReducers} from 'redux';
import auth from './auth-reducer.js';
import tasks from './tasks-reducer.js';
import task from './task-reducer.js';
import regression from './regression-reducer.js';

const rootReducer = combineReducers({
  auth,
  tasks,
  task,
  regression
});

export default rootReducer;
