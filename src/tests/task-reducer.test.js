import reducer from '../reducers/task-reducer'
import * as actions from '../actions/task-actions'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        error: false,
        loading: false,
        task: {},
        modal_open: false,
        modal_mode: 'add',
      })
  })

  it('should handle OPEN_MODAL', () => {
    expect(
      reducer({}, {
        type: actions.OPEN_MODAL,
        mode: 'add'
      })
    ).toEqual({
        modal_open: true,
        modal_mode: 'add',
      })
  })
})
