const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv').config(); //you need a .env file with db infos in it
const build = path.join(__dirname, '../build');
const moduleSocketController = require('./socketControllers/module-socketController');
const dataSocketController = require('./socketControllers/data-socketController');

const DataHandler = require('./data-handler');

const port = process.env.PORT || 3001;
const localString = 'mongodb://localhost:27017/sunshare';
const externalString =
  'mongodb://sunshare:1mo2Pa55e@ds249967.mlab.com:49967/sunshare';

mongoose.Promise = global.Promise;

const timeIntervall = 1000; //60 * 5 * 1000;

mongoose
  .connect(localString, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(setupServer, err => {
    console.log('error in db connection');
    console.log(err);

    mongoose
      .connect(externalString, {
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .then(setupServer, err => {
        console.log('error in db connection');
        console.log(err);
      });
  });

const setupServer = () => {
  console.log('connected to db');
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(build));
  app.use('/admin', express.static(build)); //Serves resources from public folder

  const server = http.createServer(app);

  server.listen(port);

  const dataHandler = new DataHandler(timeIntervall);

  dataHandler.startTimer();

  console.log(`server is listenning on port : ${port}`);

  const io = require('socket.io')(server);

  io.on('connection', socket => {
    console.log('an user connected');
    moduleSocketController(socket, io);
  });

  const dataNsp = io.of('datas');

  dataNsp.on('connection', socket => {
    console.log('an user connected to datas namespace');

    dataSocketController(dataHandler, socket, dataNsp);
  });
};
