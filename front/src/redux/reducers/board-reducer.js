import {
  ADD_MODULE,
  REMOVE_MODULE,
  INITIAL_STATE,
  MOVE_MODULE,
  MODULE_STARTED,
  MODULE_ERROR,
  LOAD_MODULES
} from '../constants';

export function board(board = INITIAL_STATE.board, action) {
  switch (action.type) {
    case LOAD_MODULES:
      return Object.assign({}, board, {
        loading: false,
        modules: action.modules.map(m => {
          return {
            id: m._id,
            componentName: m.componentName,
            position: m.position,
            size: m.size
          };
        })
      });
    case ADD_MODULE:
      return Object.assign({}, board, {
        loading: false,
        modules: board.modules.concat(
          Object.assign(
            {},
            {
              id: action.module._id,
              componentName: action.module.componentName,
              position: action.module.position,
              size: action.module.size
            }
          )
        )
      });
    case MOVE_MODULE:
      return Object.assign({}, board, {
        loading: false,
        modules: board.modules.map(m =>
          m.id.toString() === action.movedModule._id.toString()
            ? { ...m, position: action.movedModule.position }
            : m
        )
      });
    case REMOVE_MODULE:
      return Object.assign({}, board, {
        loading: false,
        modules: board.modules.filter(
          m => m.id.toString() !== action.moduleId.toString()
        )
      });
    case MODULE_STARTED:
      return Object.assign({}, board, {
        loading: true
      });
    case MODULE_ERROR:
      return Object.assign({}, board, {
        loading: false
      });
    default:
      return board;
  }
}
