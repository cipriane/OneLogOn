import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

test('renders without crashing', () => {
  const layout = shallow(<Layout><React.Fragment /></Layout>);
});
