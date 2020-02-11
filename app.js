

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const routerArticles = require("./router/articles");
const routerUsers = require("./router/users");
const routerComments = require("./router/commentaires");
const routerParam = require("./router/parametres");

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

app.use("/articles",routerArticles);
app.use("/users",routerUsers);
app.use("/commentaires",routerComments);
app.use("/parametres",routerParam);

// Ecommerce20_Shop
// H8a45q8OFfUuNfqj
// https://immense-tundra-17548.herokuapp.com/
// git commit -m"first commit"
// git push heroku master
// git commit -a -m"autre commit"

const urlBDD = "mongodb+srv://Ecommerce20_Shop:H8a45q8OFfUuNfqj@cluster0-cthgq.mongodb.net/GuitarShop?retryWrites=true&w=majority";
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


const port = process.env.PORT || 6400 ;

app.listen(port , function(){ 
    console.log("serveur lancé sur le port " + port);
});

