import React from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout';

test('renders without crashing', () => {
  const logout = shallow(<Logout />);
});
