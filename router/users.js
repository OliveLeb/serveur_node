const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validationUser } = require('../model/modelUser');
const verify = require('../middleware/autorisation');
const { admin, visitor } = require('../middleware/role');

const routerUsers = express.Router();

/*router.get(); //all
router.get(); // one
router.post(); //create
router.put(); // update
router.delete(); // suppr*/

// CREATE
routerUsers.post(
  '/',
  /*[verify, admin],*/ async function(req, res) {
    const body = req.body;
    const verif = validationUser(body); // COMPARAISON BODY ET SCHEMA

    // SI TOUT OK
    verif
      .then(async () => {
        // VERIF SI EMAIL NON ASSOCIE A UN COMPTE EXISTANT
        await User.find({ email: req.body.email }).then(result => {
          if (result.length !== 0)
            return res
              .status(400)
              .send('Il existe déjà un compte avec cet email.');

          User.find({ identifiant: req.body.identifiant }).then(resultat => {
            if (resultat.length !== 0)
              return res.status(400).send('Identifiant déjè existant.');

            // CRYPTAGE DU PASSWORD DANS LA BDD
            bcrypt.genSalt(10).then(salt => {
              bcrypt.hash(req.body.password, salt).then(hashedPassword => {
                const user = new User({
                  nom: req.body.nom,
                  prenom: req.body.prenom,
                  identifiant: req.body.identifiant,
                  password: hashedPassword,
                  email: req.body.email,
                  role: req.body.role,
                  estActif: req.body.estActif
                });
                user.save();
                res.send(user);
              });
            });
          });
        });
      })

      // SI ERREUR LORS DE LA VERIFICATION
      .catch(error => {
        res.status(400).send(error.details[0].message);
      });
  }
);

// GET ALL
routerUsers.get(
  '/',
  /*[verify, visitor],*/ async function(req, res) {
    const resultat = await User.find();
    res.send(resultat);
  }
);

// GET ONE
routerUsers.get(
  '/:id',
  /*[verify, visitor],*/ async function(req, res) {
    const id = req.params.id;
    const verifID = mongoose.Types.ObjectId.isValid(id);

    if (!verifID) {
      res.status(400).send("l'id donné n'est pas comforme");
      return;
    }

    const resultat = await User.find({ _id: id });
    if (resultat.length === 0) {
      res.status(404).send("Aucun enregistrement pour l'id " + id);
      return;
    }

    res.send(resultat);
  }
);

// DELETE
routerUsers.delete(
  '/:id',
  /*[verify, admin],*/ async function(req, res) {
    const id = req.params.id;
    const verifID = mongoose.Types.ObjectId.isValid(id);

    if (!verifID) {
      res.status(400).send("L'id transmis n'est pas conforme.");
      return;
    }

    const resultat = await User.deleteOne({ _id: id });

    if (resultat.deletedCount === 0) {
      res
        .status(404)
        .send("Il n'existe pas d'enregistrement avec l'id " + id + '.');
      return;
    }

    const reponse = await User.find();
    res.send(reponse);
  }
);

// UPDATE
routerUsers.put(
  '/:id',
  /*[verify, admin],*/ async function(req, res) {
    const id = req.params.id;
    const verifID = mongoose.Types.ObjectId.isValid(id);

    if (!verifID) {
      res.status(400).send("L'id transmis n'est pas conforme.");
      return;
    }

    const body = req.body;
    const verif = validationUser(body);

    if (verif.error) {
      res.status(400).send(verif.error.details[0].message);
      return;
    }

    const resultat = await User.findById(id);
    if (!resultat) {
      res.status(404).send("Aucun enregistrement trouvé pour l'id " + id);
      return;
    }

    resultat.nom = body.nom;
    resultat.prenom = body.prenom;
    resultat.identifiant = body.identifiant;
    resultat.email = body.email;
    resultat.password = body.password;
    resultat.role = body.role;
    resultat.estActif = body.estActif;

    const reponse = await resultat.save();
    res.send(reponse);
  }
);

module.exports = routerUsers;
