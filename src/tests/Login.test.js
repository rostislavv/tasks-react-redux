import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import {shallow} from 'enzyme';
import _ from 'lodash';
import {Login} from '../components/login/Login';

test('Login form changes the state after input', () => {
  const login = shallow(
    <Login error={false} loading={false} dispatch={() => {}}/>
  );
  expect(login.state()).toEqual({
    login: '',
    pass: ''
  });

  expect(login.find('input').length).toEqual(2);
  login.find('input').first().simulate('change', {target: {value: 'admin'}});
  expect(login.state('login')).toEqual('admin');
});
