import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Table from './components/table/table.js';
import produce from 'immer';
import './index.css';

let savedRewards = JSON.parse(localStorage.getItem("react.miles.test.rewards"));
const initialState = {
  rewards : new Array(5).fill(true).map(() => new Array(5).fill(true)),
  undoStates : [],
  redoStates : []
};
if (savedRewards !== null) {
  initialState.rewards = savedRewards;
}


function reducer(state = initialState, action) {
  switch(action.type) {
    case 'REMOVE':
      return produce(state, draft => {
        draft.undoStates.push(state.rewards);
        draft.rewards[action.value.rIndex][action.value.cIndex] = false;
        draft.redoStates = [];
      });
    case 'ADD':
      return produce(state, draft => {
        draft.undoStates.push(state.rewards);
        draft.rewards[action.value.rIndex][action.value.cIndex] = true;
        draft.redoStates = [];
      });
    case 'UNDO':
      return produce(state, draft => {
        draft.redoStates.push(draft.rewards);
        draft.rewards = draft.undoStates.pop();
      });
    case 'REDO':
      return produce(state, draft => {
        draft.undoStates.push(draft.rewards);
        draft.rewards = draft.redoStates.pop();
      });
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Table></Table>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
