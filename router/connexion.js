const router = require('express').Router();
const { User, validationConnexion } = require('../model/modelUser');
const bcrypt = require('bcrypt');
/*
router.post('/', (req, res) => {
  const { identifiant, email, password } = req.body;
  let utilisateur = {
    identifiant: identifiant,
    email: email,
    password: password
  };
  const verif = validationConnexion(utilisateur);
  verif
    .then(async () => {
      // chercher si email ou identifiant existant
      utilisateur = await utilisateur.findOne({
        email: email,
        identifiant: identifiant
      });
      // si non existant error 400
      if (!utilisateur)
        return res
          .status(400)
          .send({ msg: 'email ou identifiant introuvable' });

      // chercher si password correspond
      const validPassword = await bcrypt.compare(
        password,
        utilisateur.password
      );
      // si password invalide error 400
      if (!validPassword)
        res.status(400).send({ msg: 'Mot de passe invalide' });

      res.send('CONNECTED !');
    })
    // si données non conforme error 400
    .catch(error => {
      res.status(400).send(error.details[0].message);
    });
});*/

router.post('/', async (req, res) => {
  const { error } = validationConnexion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    $or: [{ email: req.body.email }, { identifiant: req.body.identifiant }]
  });
  if (!user) return res.status(400).send({ msg: 'email introuvable' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send('Mot de passe invalide');

  res.send('CONNECTED');
});

module.exports = router;
