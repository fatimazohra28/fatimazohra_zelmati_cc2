const express = require('express');
const router = express.Router();
const Utilisateur = require('./Utilisateur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route pour l'inscription d'un utilisateur
router.post('/register', async (req, res) => {
  const utilisateur = await Utilisateur.findOne({ email: req.body.email });
  if (utilisateur) {
    return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
  }

  const hashedPassword = await bcrypt.hash(req.body.mdp, 10);
  const nouveauUtilisateur = new Utilisateur({
    nom: req.body.nom,
    email: req.body.email,
    login: req.body.login,
    mdp: hashedPassword
  });

  nouveauUtilisateur.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès' }))
    .catch(error => res.status(500).json({ message: 'Erreur  de la création de l\'utilisateur', error }));
});


router.post('/login', async (req, res) => {
  const utilisateur = await Utilisateur.findOne({ login: req.body.login });
  if (!utilisateur) {
    return res.status(400).json({ message: 'Login invalide' });
  }

  const passwordMatch = await bcrypt.compare(req.body.mdp, utilisateur.mdp);
  if (!passwordMatch) {
    return res.status(400).json({ message: 'mot de pass invalide' });
  }

  const token = jwt.sign({ userId: utilisateur._id }, 'secret_key');
  res.json({ token });
});
router.get("/user/:username", (req, res) => {
  const username = req.params.username;

  Utilisateur.find({ nom: username })
    .then((utilisateur) => {
      res.json(utilisateur);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération d utilisateur",
        });
    });
});

module.exports = router;
