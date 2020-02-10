

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routerArticles = require("./router/articles");
const routerUsers = require("./router/users");
const routerComments = require("./router/commentaires");
const routerParam = require("./router/parametres");

const app = express();
app.use(express.json());
app.use(cors()); // autorise des sites internets a lui faire des requetes

app.use("/articles",routerArticles);
app.use("/users",routerUsers);
app.use("/commentaires",routerComments);
app.use("/parametres",routerParam);

// Ecommerce20_Shop
// H8a45q8OFfUuNfqj
// https://immense-tundra-17548.herokuapp.com/

const urlBDD = "mongodb+srv://ifocop_admin:azerty1234@cluster0-cthgq.mongodb.net/GuitarShop?retryWrites=true&w=majority";
const optionConnexion = {
    useNewUrlParser : true,
    useUnifiedTopology : true
};

mongoose.connect(urlBDD , optionConnexion)
        .then(function(){
            console.log("connexion à la base de donnée est réussie");
        })
        .catch(function(err){
            console.log(err);
        })

//app.listen(6400);
const port = process.env.PORT || 6400 ;

app.listen(port , function(){ 
    console.log("serveur lancé sur le port " + port);
});

