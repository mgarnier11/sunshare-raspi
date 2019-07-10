import openSocket from 'socket.io-client';

import store from '../redux/store';
import { ADD_MODULE, MOVE_MODULE, REMOVE_MODULE } from '../redux/constants';

class ApiHandler {
  constructor() {
    this.socket = openSocket(window.apiUrl);

    this.socket.on('connect', () =>
      console.log('succesfully connected to api')
    );

    this.socket.on('modules/create', createdModule => {
      console.log(createdModule);
      store.dispatch({ type: ADD_MODULE, module: createdModule });
    });

    this.socket.on('modules/update', updatedModule => {
      console.log(updatedModule);
      store.dispatch({ type: MOVE_MODULE, movedModule: updatedModule });
    });

    this.socket.on('modules/delete', deletedModule => {
      console.log(deletedModule);
      store.dispatch({ type: REMOVE_MODULE, moduleId: deletedModule._id });
    });
  }

  addModule(datas) {
    return new Promise((res, rej) => {
      this.socket.emit('modules/create', datas, createdModule => {
        if (createdModule.err) rej(createdModule.err);
        res(createdModule);
      });
    });
  }

  moveModule(moduleId, nextPosition) {
    return new Promise((res, rej) => {
      const datas = { _id: moduleId, position: nextPosition };
      this.socket.emit('modules/update', moduleId, datas, updatedModule => {
        if (updatedModule.err) rej(updatedModule.err);
        res(updatedModule);
      });
    });
  }

  removeModule(moduleId) {
    return new Promise((res, rej) => {
      this.socket.emit('modules/delete', moduleId, deletedModule => {
        if (deletedModule.err) rej(deletedModule.err);
        res(deletedModule);
      });
    });
  }

  loadModules() {
    return new Promise((res, rej) => {
      this.socket.emit('modules/getAll', modules => {
        if (modules.err) rej(modules.err);
        res(modules);
      });
    });
  }
}

const apiHandler = new ApiHandler();

export default apiHandler;
