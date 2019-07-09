const moduleModel = require('../models/module-model');
const mongoose = require('mongoose'); // Import du schéma
const ModuleModel = mongoose.model('ModuleModel', moduleModel); // Création du modèle à partir du schéma

const getAll = () => {
  return new Promise((res, rej) => {
    ModuleModel.find({}, (err, moduleItems) => {
      if (err) rej(err);
      res(moduleItems);
    });
  });
};

const create = datas => {
  return new Promise((res, rej) => {
    const newModuleItem = new ModuleModel(datas);
    newModuleItem.save((err, createdModuleItem) => {
      if (err) rej(err);
      res(createdModuleItem);
    });
  });
};

const get = id => {
  return new Promise((res, rej) => {
    ModuleModel.findById(id, (err, moduleItem) => {
      if (err) rej(err);
      res(moduleItem);
    });
  });
};

const update = (id, datas) => {
  return new Promise((res, rej) => {
    ModuleModel.updateOne(
      { _id: id },
      { $set: { position: datas.position } },
      async (err, response) => {
        if (err) rej(err);

        const updatedModuleItem = await get(id);

        res(updatedModuleItem);
      }
    );
  });
};

const remove = id => {
  return new Promise((res, rej) => {
    ModuleModel.findByIdAndRemove(id, (err, deletedModuleItem) => {
      if (err) rej(err);
      res(deletedModuleItem);
    });
  });
};

const moduleService = {
  getAll: getAll,
  create: create,
  get: get,
  update: update,
  delete: remove
};

module.exports = moduleService; // Export du Service
