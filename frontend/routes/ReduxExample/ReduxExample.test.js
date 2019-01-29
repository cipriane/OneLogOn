import React from 'react';
import { shallow } from 'enzyme';
import { ReduxExampleTest as ReduxExample } from './ReduxExample';

test('renders without crashing', () => {
  const reduxExample = shallow(
    <ReduxExample value={0} onIncreaseClick={() => {}}/>
  );
});
