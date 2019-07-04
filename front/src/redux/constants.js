export const ADD_ERROR = 'ADD_ERROR';
export const HANDLE_ERROR = 'HANDLE_ERROR';

export const ADD_MODULE = 'ADD_MODULE';
export const REMOVE_MODULE = 'REMOVE_MODULE';

export const INITIAL_STATE = {
  modules: {
    list: [],
    isLoading: false
  },
  errors: []
};
