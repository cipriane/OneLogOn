import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

test('renders without crashing', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const login = shallow(<Login />);
});
