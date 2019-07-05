import { ADD_MODULE } from '../constants';
import { REMOVE_MODULE } from '../constants';

/*
module: {componentName: 'Patate', position: {x: 5, y: 2}, size: {x: 2, y: 2}}
*/

export function addModule(module) {
  return { type: ADD_MODULE, module };
}

export function removeModule(module) {
  return { type: REMOVE_MODULE, module };
}
