import * as actions from '../actions/auth-actions'

test('auth-actions', () => {
  const user = 'admin', pass = 'pass';
  const expectedAction = {
    type: actions.LOGIN,
    username: user,
    password: pass
  }

  expect(actions.loginActionCreator(user, pass)).toEqual(expectedAction)
})
