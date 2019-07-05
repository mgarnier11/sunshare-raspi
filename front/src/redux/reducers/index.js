import { combineReducers } from 'redux';

import { errors } from './error-reducer';
import { board } from './board-reducer';

const combinedReducers = combineReducers({
  board: board,
  errors: errors
});

export default combinedReducers;
