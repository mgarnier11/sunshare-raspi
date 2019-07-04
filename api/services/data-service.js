const dataModel = require('../models/data-model');
const mongoose = require('mongoose'); // Import du schéma
const DataModel = mongoose.model('DataModel', dataModel); // Création du modèle à partir du schéma

function respond(err, result, res) {
  // Fonction utilisée tout au long du contrôleur pour répondre
  if (err) {
    return res.status(500).json({ error: err });
  }
  return res.json(result);
}

const dataService = {
  getAll: () => {
    return new Promise((res, rej) => {
      DataModel.find({}, (err, dataItems) => {});
    });
  },
  create: datas => {
    return new Promise((res, rej) => {
      const newDataItem = new DataModel(datas);
      newDataItem.save((err, savedDataItem) => {
        if (err) rej(err);
        res(savedDataItem);
      });
    });
  },
  get: id => {
    return new Promise((res, rej) => {
      DataModel.findById(id, (err, dataItem) => {
        if (err) rej(err);
        res(dataItem);
      });
    });
  },
  update: (id, datas) => {
    return new Promise((res, rej) => {
      DataModel.findByIdAndUpdate(id, datas, (err, dataItem) => {
        if (err) rej(err);
        res(dataItem);
      });
    });
  },
  delete: id => {
    return new Promise((res, rej) => {
      DataModel.findByIdAndRemove(id, (err, dataItem) => {
        if (err) rej(err);
        res(dataItem);
      });
    });
  }
};

module.exports = dataService; // Export du contrôleur
