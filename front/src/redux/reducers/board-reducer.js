import {
  ADD_MODULE,
  REMOVE_MODULE,
  INITIAL_STATE,
  MOVE_MODULE
} from '../constants';

let ids = 0;

export function board(board = INITIAL_STATE.board, action) {
  switch (action.type) {
    case ADD_MODULE:
      /*
      let boardLayout = [...board.layout];

      for (let y = 0; y < action.module.size.y; y++) {
        Array.prototype.splice.apply(
          boardLayout[action.module.position.y + y],
          [action.module.position.x, action.module.size.x].concat([
            ...Array(action.module.size.x).fill(true)
          ])
        );
      }*/

      return Object.assign({}, board, {
        modules: board.modules.concat(
          Object.assign(
            {},
            {
              id: ids++,
              componentName: action.module.componentName,
              position: action.module.position,
              size: action.module.size
            }
          )
        )
      });
    case MOVE_MODULE:
      return Object.assign({}, board, {
        modules: board.modules.map(m =>
          m.id === action.module.moduleId
            ? { ...m, position: action.module.nextPosition }
            : m
        )
      });
    case REMOVE_MODULE:
      return board;
    default:
      return board;
  }
}
