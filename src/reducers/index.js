import {combineReducers} from 'redux';
import auth from './auth-reducer.js';
import tasks from './tasks-reducer.js';
import task from './task-reducer.js';
import regression from './regression-reducer.js';
import users from './users';

const rootReducer = combineReducers({
  auth,
  tasks,
  task,
  regression,
  users
});

export default rootReducer;
