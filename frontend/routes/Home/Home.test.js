import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

test('renders without crashing', () => {
  const home = shallow(<Home />);
});
