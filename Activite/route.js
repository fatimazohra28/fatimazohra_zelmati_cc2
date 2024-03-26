const express = require('express');
const router = express.Router();
const Activite = require('./Activite');
const Tache = require('./tache/Tache');
const Activite = require('./auth-service/Activite');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post("/add", (req, res) => {
    const newActivite = new Activite({
        utilisateur_id: req.body.utilisateur_id,
        tache_id: req.body.tache_id,
      });
    if(Utilisateur.find({ utilisateur_id: utilisateur_id })&& Tache.find({ tache_id: tache_id })){
        newActivite
        .save()
        .then(() => {
          res.status(201).json({ message: "Activite ajouté avec succès" });
        })
    }else{
        newActivite.catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de l'ajout du Activite" });
          });
      }
  });