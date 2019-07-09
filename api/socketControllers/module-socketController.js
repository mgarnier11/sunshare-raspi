const moduleService = require('../services/module-service');

function moduleSocketController(socket, io) {
  socket.on('modules/getAll', async cb => {
    try {
      const mList = await moduleService.getAll();

      socket.emit('modules/getAll', mList);

      cb(mList);
    } catch (error) {
      cb({ err: error });
    }
  });

  socket.on('modules/get', async (id, cb) => {
    try {
      const m = await moduleService.get(id);

      socket.emit('modules/get', m);

      cb(m);
    } catch (error) {
      cb({ err: error });
    }
  });

  socket.on('modules/create', async (datas, cb) => {
    try {
      const createdModule = await moduleService.create(datas);

      io.sockets.emit('modules/create', createdModule);

      cb(createdModule);
    } catch (error) {
      cb({ err: error });
    }
  });

  socket.on('modules/update', async (id, datas, cb) => {
    try {
      const updatedModule = await moduleService.update(id, datas);

      io.sockets.emit('modules/update', updatedModule);

      cb(updatedModule);
    } catch (error) {
      cb({ err: error });
    }
  });

  socket.on('modules/delete', async (id, cb) => {
    try {
      const deletedModule = await moduleService.delete(id);

      io.sockets.emit('modules/delete', deletedModule);

      cb(deletedModule);
    } catch (error) {
      cb({ err: error });
    }
  });
}

module.exports = moduleSocketController;
