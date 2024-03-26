const express = require('express');
const router = express.Router();
const Tache = require('./Tache');




// Route pour ajouter une tache
router.post('/add', (req, res) => {
  const newtache = new tache({
    libelle: req.body.libelle
  });

  newtache.save()
    .then(() => {
      res.status(201).json({ message: ' l\'ajoute avec succès' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Erreur d\'ajout de la tache' });
    });
});

// Route pour afficher details d'une tache
router.get("/tache/:id", (req, res) => {
    const id = req.params.id;
  
    Tache.find({ tache: id })
      .then((tache) => {
        res.json(tache);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({
            message: "Erreur de  la recuperation de details de cette tache",
          });
      });
  });


module.exports = router;
