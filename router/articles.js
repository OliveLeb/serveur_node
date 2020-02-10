


const express = require("express");
const mongoose = require("mongoose");
const {Article, schema} = require("../model/modelArticle");

const routerArticles = express.Router();








/*router.get(); //all
router.get(); // one
router.post(); //create
router.put(); // update
router.delete(); // suppr*/


routerArticles.post("/", async function(req,res){
    
    const body = req.body;

    const verif = schema.validate(body);

    // si not ok => message d'erreur + fin d'execution
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }

    // si ok => ajouter dans Bdd
    const article = new Article(body);
    const resultat = await article.save(); // asynchrone => attendre que Mongo ecrive
    res.send(resultat);
});


routerArticles.get("/", async function(req,res){
    const resultat = await Article.find()
    res.send(resultat);
});


routerArticles.get("/:id", async function(req,res){

    const id = req.params.id;   

    const verifID = mongoose.Types.ObjectId.isValid(id);

    if(!verifID){
        res.status(400).send("l'id donné n'est pas comforme")
        return;
    }

    const resultat = await Article.find({_id:id});

    

    if(resultat.length===0){
        res.status(404).send("Aucun enregistrement pour l'id "+id);
        return;
        }
        
        res.send(resultat);
});


routerArticles.delete("/:id", async function(req,res){

    const id = req.params.id;

    const verifID = mongoose.Types.ObjectId.isValid(id);
   
    if(!verifID){
        res.status(400).send("L'id transmis n'est pas conforme.");
        return;
    }

    const resultat = await Article.deleteOne({_id:id});
    //res.send(resultat);

    if(resultat.deletedCount === 0){
        res.status(404).send("Il n'existe pas d'enregistrement avec l'id "+id+".");
        return;
    }

    const reponse = await Article.find();
    
    res.send(reponse);
    
});


routerArticles.put("/:id", async function(req,res){

    const id = req.params.id;
    const verifID = mongoose.Types.ObjectId.isValid(id);

    if(!verifID){
        res.status(400).send("L'id transmis n'est pas conforme.");
        return;
    }

    const body=req.body;
    const verif = schema.validate(body);

    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }

    const resultat = await Article.findById(id);
    if(!resultat){
        res.status(404).send("Aucun enregistrement trouvé pour l'id "+id);
        return;
    }

    resultat.titre=body.titre;
    resultat.contenu=body.contenu;
    resultat.dateCreation=body.dateCreation;
    resultat.nomAuteur=body.nomAuteur;
    resultat.emailAuteur=body.emailAuteur;
    resultat.categorie=body.categorie;
    resultat.prix=body.prix;
    resultat.published=body.published;
    
    const reponse = await resultat.save();
    res.send(reponse);
});



module.exports = routerArticles;