import React from 'react';
import App from '../client/components/App';
import {shallow} from 'enzyme';

it('App содержит в тексте Hello', () => {
  const wrapper = shallow(<App />);

expect(/Hello/.test(wrapper.text())).toEqual(true);
});
