const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const build = path.join(__dirname, '../build');
const moduleSocketController = require('./socketControllers/module-socketController');

const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost:27017/sunshare', {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log('connected to db');
      const app = express();

      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(express.static(build)); //Serves resources from public folder

      const server = http.createServer(app);

      server.listen(port);

      console.log(`server is listenning on port : ${port}`);

      const io = require('socket.io')(server);

      io.on('connection', socket => {
        console.log('an user connected');
        moduleSocketController(socket, io);
      });
    },
    err => {
      console.log('error in db connection');
      console.log(err);
    }
  );
