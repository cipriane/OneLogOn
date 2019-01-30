import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from './NoMatch';

test('renders without crashing', () => {
  const noMatch = shallow(<NoMatch />);
});
