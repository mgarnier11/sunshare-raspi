function dataSocketController(dataHandler, socket, nsp) {
  socket.on('datas/prod/getAll', async cb => {
    try {
      const allDatas = dataHandler.prodDatas;
      socket.emit('datas/prod/getAll', allDatas);

      cb(allDatas);
    } catch (error) {
      cb({ err: error });
    }
  });

  socket.on('datas/prod/last', async cb => {
    try {
      const lastData = dataHandler.prodDatas[0];
      socket.emit('datas/prod/last', lastData);

      cb(lastData);
    } catch (error) {
      cb({ err: error });
    }
  });

  dataHandler.events.on('newProdData', newProdData => {
    socket.emit('datas/prod/new', newProdData);
  });
}

module.exports = dataSocketController;
