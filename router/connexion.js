const express = require('express');
const { User, validationConnexion } = require('../model/modelUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const routerConnexion = express.Router();

routerConnexion.post('/', async (req, res) => {
  const { error } = validationConnexion(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    $or: [{ email: req.body.email }, { identifiant: req.body.identifiant }]
  });
  if (!user) return res.status(400).send('email ou identifiant introuvable');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send('Mot de passe invalide');

  //creation d'un token
  // token_secret dans .env
  const utilisateur = { _id: user._id, role: user.role };
  const token = jwt.sign(utilisateur, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
  //res.cookie('auth-token', token, { httpOnly: true, secure: true });

  /*
  const token = user.generateAuthenToken();
  resp
    .header('auth-token', token)
    .header('access-control-expose-headers', 'auth-token')
    .send({
      data: 'Bienvenue, vous êtes connecté !',
      token: token
    });*/
});

module.exports = routerConnexion;
