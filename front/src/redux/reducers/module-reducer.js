import { ADD_MODULE, REMOVE_MODULE, INITIAL_STATE } from '../constants';

let ids = 0;

export function modules(modules = INITIAL_STATE.modules, action) {
  switch (action.type) {
    case ADD_MODULE:
      return modules.concat(
        Object.assign(
          {},
          {
            id: ids++,
            module: action.module
          }
        )
      );
    case REMOVE_MODULE:
      return modules.filter(m => m.id !== action.moduleId);
    default:
      return modules;
  }
}
