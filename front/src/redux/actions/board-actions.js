import { ADD_MODULE, MOVE_MODULE, REMOVE_MODULE } from '../constants';

/*
module: {componentName: 'Patate', position: {x: 5, y: 2}, size: {x: 2, y: 2}}
*/

export function addModule(module) {
  return { type: ADD_MODULE, module };
}

export function moveModule(moduleId, nextPosition) {
  return { type: MOVE_MODULE, module: { moduleId, nextPosition } };
}

export function removeModule(moduleId) {
  return { type: REMOVE_MODULE, moduleId };
}
