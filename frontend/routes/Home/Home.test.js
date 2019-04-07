import React from 'react';
import { shallow } from 'enzyme';
import HomeTest from './Home';

test('renders without crashing', () => {
  const home = shallow(<HomeTest />);
});
