import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';

describe('basic rendering', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Application />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
