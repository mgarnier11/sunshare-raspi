import { ADD_MODULE, REMOVE_MODULE } from '../constants';

export function addModule(module) {
  return { type: ADD_MODULE, module };
}

export function removeModule(moduleId) {
  return { type: REMOVE_MODULE, moduleId };
}
