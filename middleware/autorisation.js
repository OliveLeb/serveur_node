// VERIFICATION DU TOKEN JWTOKEN

const jwt = require('jsonwebtoken');

async function verify(req, res, next) {
  const token = req.header('auth-token');
  //const token = req.cookie('auth-token');
  if (!token) return res.status(401).send('Accès refusé, token non fourni');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token fourni invalide');
  }
}

module.exports = verify;
