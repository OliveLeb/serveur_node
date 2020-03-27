function admin(req, res, next) {
  if (req.user.role != 'admin')
    return res.status(403).send({ msg: 'Ressource non authorisée ??' });
  next();
}
/*
function redac(req, res, next) {
  if (req.user.role != 'redac')
    return res.status(403).send({ msg: 'Ressource non authorisée' });

  next();
}

function visitor(req, res, next) {
  if (req.user.role != 'visitor')
    return res.status(403).send({ msg: 'Ressource non authorisée' });

  next();
}*/

module.exports = admin; /*
module.exports = redac;
module.exports = visitor;*/
