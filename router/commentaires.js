const express = require('express');
const mongoose = require('mongoose');
const { Comment, schema } = require('../model/modelCommentaires');
const verify = require('../middleware/autorisation');
const { all } = require('../middleware/role');

const routerComments = express.Router();

// CREATE
routerComments.post('/', [verify, all], async function(req, res) {
  const body = req.body;
  const verif = schema.validate(body);

  // si not ok => message d'erreur + fin d'execution
  if (verif.error) {
    res.status(400).send(verif.error.details[0].message);
    return;
  }

  // si ok => ajouter dans Bdd
  const comment = new Comment(body);
  const resultat = await comment.save(); // asynchrone => attendre que Mongo ecrive
  res.send(resultat);
});

// GET ALL
routerComments.get('/', async function(req, res) {
  const resultat = await Comment.find();
  res.send(resultat);
});

// GET ONE
routerComments.get('/:id', async function(req, res) {
  const id = req.params.id;
  const verifID = mongoose.Types.ObjectId.isValid(id);

  if (!verifID) {
    res.status(400).send("l'id donné n'est pas comforme");
    return;
  }

  const resultat = await Comment.find({ _id: id });

  if (resultat.length === 0) {
    res.status(404).send("Aucun enregistrement pour l'id " + id);
    return;
  }

  res.send(resultat);
});

// DELETE
routerComments.delete('/:id', [verify, all], async function(req, res) {
  const id = req.params.id;
  const verifID = mongoose.Types.ObjectId.isValid(id);

  if (!verifID) {
    res.status(400).send("L'id transmis n'est pas conforme.");
    return;
  }

  const resultat = await Comment.deleteOne({ _id: id });

  if (resultat.deletedCount === 0) {
    res
      .status(404)
      .send("Il n'existe pas d'enregistrement avec l'id " + id + '.');
    return;
  }

  const reponse = await Comment.find();
  res.send(reponse);
});

// UPDATE
routerComments.put('/:id', [verify, all], async function(req, res) {
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

  const resultat = await Comment.findById(id);
  if (!resultat) {
    res.status(404).send("Aucun enregistrement trouvé pour l'id " + id);
    return;
  }

  resultat.contenu = body.contenu;
  resultat.nomAuteur = body.nomAuteur;

  const reponse = await resultat.save();
  res.send(reponse);
});

module.exports = routerComments;
