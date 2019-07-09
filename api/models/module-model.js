const mongoose = require('mongoose'); // Import de la librairie mongoose
const Schema = mongoose.Schema;

// Définition du schéma
const ModuleSchema = new Schema({
  componentName: String,
  position: { x: Number, y: Number },
  size: { x: Number, y: Number }
});

module.exports = ModuleSchema; // Export du schéma
