import {
  MODULE_STARTED,
  MODULE_ERROR,
  ADD_MODULE,
  MOVE_MODULE,
  REMOVE_MODULE,
  ADD_ERROR,
  LOAD_MODULES
} from '../constants';
import apiHandler from '../../api/handler';

/*
module: {componentName: 'Patate', position: {x: 5, y: 2}, size: {x: 2, y: 2}}
*/

export function loadModules() {
  return function(dispatch) {
    dispatch({ type: MODULE_STARTED });
    return apiHandler
      .loadModules()
      .then(modules => {
        dispatch({ type: LOAD_MODULES, modules });
      })
      .catch(error => {
        dispatch({ type: MODULE_ERROR });
        dispatch({ type: ADD_ERROR, error: error });
      });
  };
}

export function addModule(m) {
  return function(dispatch) {
    dispatch({ type: MODULE_STARTED });
    return apiHandler
      .addModule(m)
      .then(newModule => {
        dispatch({ type: ADD_MODULE, module: newModule });
      })
      .catch(error => {
        dispatch({ type: MODULE_ERROR });
        dispatch({ type: ADD_ERROR, error: error });
      });
  };
}

export function moveModule(m, nextPosition) {
  return function(dispatch) {
    dispatch({ type: MODULE_STARTED });
    return apiHandler
      .moveModule(m, nextPosition)
      .then(movedModule => {
        dispatch({ type: MOVE_MODULE, movedModule });
      })
      .catch(error => {
        dispatch({ type: MODULE_ERROR });
        dispatch({ type: ADD_ERROR, error: error });
      });
  };
}

export function removeModule(id) {
  return function(dispatch) {
    dispatch({ type: MODULE_STARTED });
    return apiHandler
      .removeModule(id)
      .then(removedModule => {
        dispatch({ type: REMOVE_MODULE, moduleId: removedModule._id });
      })
      .catch(error => {
        dispatch({ type: MODULE_ERROR });
        dispatch({ type: ADD_ERROR, error: error });
      });
  };
}
/*
export function addModule(m) {
  return { type: ADD_MODULE, module: m };
}*/
/*
export function moveModule(moduleId, nextPosition) {
  return { type: MOVE_MODULE, module: { moduleId, nextPosition } };
}
*/
/*
export function removeModule(moduleId) {
  return { type: REMOVE_MODULE, moduleId };
}
*/
