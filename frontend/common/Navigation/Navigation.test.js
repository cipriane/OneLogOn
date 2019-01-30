import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

test('renders without crashing', () => {
  const navigation = shallow(<Navigation />);
});
