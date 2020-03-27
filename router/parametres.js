const express = require('express');
const mongoose = require('mongoose');
const { Param, schema } = require('../model/modelParametre');

const routerParams = express.Router();

// CREATE
routerParams.post('/', async function(req, res) {
  const body = req.body;
  const verif = schema.validate(body);

  // si not ok => message d'erreur + fin d'execution
  if (verif.error) {
    res.status(400).send(verif.error.details[0].message);
    return;
  }

  // si ok => ajouter dans Bdd
  const param = new Param(body);
  const resultat = await param.save(); // asynchrone => attendre que Mongo ecrive
  res.send(resultat);
});

// GET ALL
routerParams.get('/', async function(req, res) {
  const resultat = await Param.find();
  res.send(resultat);
});

// GET ONE
routerParams.get('/:id', async function(req, res) {
  const id = req.params.id;
  const verifID = mongoose.Types.ObjectId.isValid(id);

  if (!verifID) {
    res.status(400).send("l'id donné n'est pas comforme");
    return;
  }

  const resultat = await Param.find({ _id: id });

  if (resultat.length === 0) {
    res.status(404).send("Aucun enregistrement pour l'id " + id);
    return;
  }

  res.send(resultat);
});

// DELETE
routerParams.delete('/:id', async function(req, res) {
  const id = req.params.id;
  const verifID = mongoose.Types.ObjectId.isValid(id);

  if (!verifID) {
    res.status(400).send("L'id transmis n'est pas conforme.");
    return;
  }

  const resultat = await Param.deleteOne({ _id: id });

  if (resultat.deletedCount === 0) {
    res
      .status(404)
      .send("Il n'existe pas d'enregistrement avec l'id " + id + '.');
    return;
  }

  const reponse = await Param.find();
  res.send(reponse);
});

// UPDATE
routerParams.put('/:id', async function(req, res) {
  const id = req.params.id;
  const verifID = mongoose.Types.ObjectId.isValid(id);

  if (!verifID) {
    res.status(400).send("L'id transmis n'est pas conforme.");
    return;
  }

  const body = req.body;
  const verif = schema.validate(body);

  if (verif.error) {
    res.status(400).send(verif.error.details[0].message);
    return;
  }

  const resultat = await Param.findById(id);
  if (!resultat) {
    res.status(404).send("Aucun enregistrement trouvé pour l'id " + id);
    return;
  }

  resultat.nbItem = body.nbItem;
  resultat.baliseSEO = body.baliseSEO;
  resultat.texteIntro = body.texteIntro;
  resultat.titreAccueil = body.titreAccueil;
  const reponse = await resultat.save();
  res.send(reponse);
});

module.exports = routerParams;
