import React from 'react';
import { shallow } from 'enzyme';
import DashBoardTest from './Dashboard';

test('renders without crashing', () => {
  const home = shallow(<DashBoardTest />);
});
