import expect, { createSpy, spyOn, isSpy } from 'expect';


const dummyReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        counter: state.counter + 1,
      };
    case 'DECREASE':
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const dummyTestIncrease = () => {
  const stateBefore = {
    counter: 1,
  };
  const stateAfter = {
    counter: 2,
  };
  const action = {
    type: 'INCREASE',
  };
  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(
    dummyReducer(stateBefore, action)
  ).toEqual(stateAfter);
};

const dummyTestDecrease = () => {
  const stateBefore = {
    counter: 2,
  };
  const stateAfter = {
    counter: 1,
  };
  const action = {
    type: 'DECREASE',
  };
  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(
    dummyReducer(stateBefore, action)
  ).toEqual(stateAfter);
};

// describe and it are global functions from mocha
describe('Dummy Reducer Tests', function() {
  it('1 + 1 = 2', function() {
    dummyTestIncrease();
  });
  it('2 - 1 = 1', function() {
    dummyTestDecrease();
  });
});
