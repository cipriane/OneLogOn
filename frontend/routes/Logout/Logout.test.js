import React from 'react';
import { shallow } from 'enzyme';
import LogoutTest from './Logout';

test('renders without crashing', () => {
  const logout = shallow(<LogoutTest />);
});
