import { ADD_MODULE, REMOVE_MODULE, INITIAL_STATE } from '../constants';

export function board(board = INITIAL_STATE.board, action) {
  switch (action.type) {
    case ADD_MODULE:
      let boardLayout = [...board.layout];

      for (let y = 0; y < action.module.size.y; y++) {
        Array.prototype.splice.apply(
          boardLayout[action.module.position.y + y],
          [action.module.position.x, action.module.size.y].concat([
            ...Array(action.module.size.x).fill(true)
          ])
        );
      }

      boardLayout[action.module.position.y][action.module.position.x] =
        action.module;

      return Object.assign({}, board, { layout: boardLayout });
    case REMOVE_MODULE:
      return board;
    default:
      return board;
  }
}
