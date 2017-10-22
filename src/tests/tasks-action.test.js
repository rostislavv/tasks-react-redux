import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/tasks-actions'
require('isomorphic-fetch');
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const tasks = require('./data/tasks.data.json');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates LOAD_TASKS and LOAD_TASKS_SUCCESS when fetching tasks has been done', () => {
    const host = `http://localhost`;
    console.log(host);
    console.log('TASKS', tasks);
    fetchMock
      .mock(`*`, {
        body: tasks,
        headers: { 'content-type': 'application/json' }
      })


    const expectedActions = [
      { type: actions.LOAD_TASKS },
      { type: actions.LOAD_TASKS_SUCCESS, tasks: tasks }
    ]
    const store = mockStore({ tasks: [] })

    return store.dispatch(actions.fetchTasks(host)).then(() => {

      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
