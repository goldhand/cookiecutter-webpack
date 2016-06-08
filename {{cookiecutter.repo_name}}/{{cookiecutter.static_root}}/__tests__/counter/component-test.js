import expect, { createSpy, spyOn, isSpy } from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Counter from '../../components/Counter';


describe('<Counter />', () => {

  it('should incrment or decrement count after click', () => {

    let count = 0;
    const counter = TestUtils.renderIntoDocument(
      <Counter incrementCounter={() => count++} decrementCounter={() => count--} value={count}/>
    );
    const counterNode = ReactDOM.findDOMNode(counter);

    expect(counterNode.textContent).toEqual('Counter: 0+-');

    TestUtils.Simulate.click(
      TestUtils.scryRenderedDOMComponentsWithTag(counter, 'button')[0]
    );

    expect(count).toEqual(1);

    TestUtils.Simulate.click(
      TestUtils.scryRenderedDOMComponentsWithTag(counter, 'button')[1]
    );

    expect(count).toEqual(0);
  });
});
