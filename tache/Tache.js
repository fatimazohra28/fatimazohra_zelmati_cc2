const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tacheSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  date_echeance: {
    type: String,
    required: true,
   
  },
  priorite: {
    type: Number,
    required: true
  }
});
const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache;