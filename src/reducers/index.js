import {combineReducers} from 'redux';
import people from './people-reducer.js';
import reddit from './reddit-reducer.js';
import auth from './auth-reducer.js';
import tasks from './tasks-reducer.js';
import task from './task-reducer.js';

const rootReducer = combineReducers({
  auth,
  people,
  tasks,
  task
});

export default rootReducer;
