export const ADD_ERROR = 'ADD_ERROR';
export const HANDLE_ERROR = 'HANDLE_ERROR';

export const MODULE_STARTED = 'MODULE_STARTED';
export const MODULE_ERROR = 'MODULE_ERROR';
export const ADD_MODULE = 'ADD_MODULE';
export const MOVE_MODULE = 'MOVE_MODULE';
export const REMOVE_MODULE = 'REMOVE_MODULE';
export const LOAD_MODULES = 'LOAD_MODULES';

let boardLayout = [];

let height = 15;
let width = 15;

for (let i = 0; i < height; i++) {
  let boardLine = [];
  for (let j = 0; j < width; j++) {
    boardLine.push(null);
  }
  boardLayout.push(boardLine);
}

/*
boardLayout[0][1] = {
  component: 'Patate',
  props: { text: 'abc' }
};
*/

export const INITIAL_STATE = {
  board: {
    modules: [],
    height: height,
    width: width,
    loading: false
  },
  errors: []
};
