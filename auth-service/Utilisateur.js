const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  mdp: {
    type: String,
    required: true
  }
});

// Avant de sauvegarder, crypter le mot de passe
utilisateurSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.mdp, salt);
    this.mdp = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;
