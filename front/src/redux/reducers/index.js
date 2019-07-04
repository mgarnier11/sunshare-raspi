import { combineReducers } from 'redux';

import { errors } from './error-reducer';

const combinedReducers = combineReducers({
  errors: errors
});

export default combinedReducers;
