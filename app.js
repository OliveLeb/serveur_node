const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // middleware de sécurité Express
const compression = require('compression'); // optimise les échanges avec le serveur en compressant les réponses du serveur
const dotenv = require('dotenv');
dotenv.config();

//const routerConnexion = require('./router/connexion');
const routerArticles = require('./router/articles');
const routerUsers = require('./router/users');
const routerComments = require('./router/commentaires');
const routerParam = require('./router/parametres');

// Middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

// import routers
//app.use('/connexion', routerConnexion);
app.use('/articles', routerArticles);
app.use('/users', routerUsers);
app.use('/commentaires', routerComments);
app.use('/parametres', routerParam);

// https://immense-tundra-17548.herokuapp.com/
// git commit -m"first commit"
// git push heroku master
// git commit -a -m"autre commit"
if (!process.env.TOKEN_SECRET) {
  console.error('FATAL ERROR TOKEN_SECRET non définie');
  process.exit(1);
}
const urlBDD = process.env.DB_CONNECT;
const optionConnexion = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(urlBDD, optionConnexion)
  .then(function() {
    console.log('Connexion à la base de donnée est réussie');
  })
  .catch(function(err) {
    console.log(err);
  });

const port = process.env.PORT || 6400;

app.listen(port, function() {
  console.log('Serveur lancé sur le port ' + port);
});
