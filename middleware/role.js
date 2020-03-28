function admin(req, res, next) {
  if (req.user.role != 'admin')
    return res.status(403).send({ msg: 'Connexion non authorisée' });
  next();
}

function redac(req, res, next) {
  if (req.user.role != 'redac' && req.user.role != 'admin')
    return res.status(403).send({ msg: 'Connexion non authorisée' });

  next();
}

function visitor(req, res, next) {
  if (
    req.user.role != 'visitor' &&
    req.user.role != 'redac' &&
    req.user.role != 'admin'
  )
    return res.status(403).send({ msg: 'Connexion non authorisée' });

  next();
}

function all(req, res, next) {
  if (
    req.user.role != 'visitor' &&
    req.user.role != 'redac' &&
    req.user.role != 'admin' &&
    req.user.role != 'user'
  )
    return res.status(403).send({ msg: 'Connexion non authorisée' });
  next();
}

module.exports.admin = admin;
module.exports.redac = redac;
module.exports.visitor = visitor;
module.exports.all = all;
