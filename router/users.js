
const express = require("express");
const mongoose = require("mongoose");
const {User, schema} = require("../model/modelUser");

const routerUsers = express.Router();








/*router.get(); //all
router.get(); // one
router.post(); //create
router.put(); // update
router.delete(); // suppr*/


routerUsers.post("/", async function(req,res){
    
    const body = req.body;

    const verif = schema.validate(body);

    // si not ok => message d'erreur + fin d'execution
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }

    // si ok => ajouter dans Bdd
    const user = new User(body);
    const resultat = await user.save(); // asynchrone => attendre que Mongo ecrive
    res.send(resultat);
});


routerUsers.get("/", async function(req,res){
    const resultat = await User.find()
    res.send(resultat);
});


routerUsers.get("/:id", async function(req,res){

    const id = req.params.id;   

    const verifID = mongoose.Types.ObjectId.isValid(id);

    if(!verifID){
        res.status(400).send("l'id donné n'est pas comforme")
        return;
    }

    const resultat = await User.find({_id:id});

    

    if(resultat.length===0){
        res.status(404).send("Aucun enregistrement pour l'id "+id);
        return;
        }
        
        res.send(resultat);
});


routerUsers.delete("/:id", async function(req,res){

    const id = req.params.id;

    const verifID = mongoose.Types.ObjectId.isValid(id);
   
    if(!verifID){
        res.status(400).send("L'id transmis n'est pas conforme.");
        return;
    }

    const resultat = await User.deleteOne({_id:id});
    //res.send(resultat);

    if(resultat.deletedCount === 0){
        res.status(404).send("Il n'existe pas d'enregistrement avec l'id "+id+".");
        return;
    }

    const reponse = await User.find();
    
    res.send(reponse);
    
});


routerUsers.put("/:id", async function(req,res){

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

    const resultat = await User.findById(id);
    if(!resultat){
        res.status(404).send("Aucun enregistrement trouvé pour l'id "+id);
        return;
    }

    resultat.nom=body.nom;
    resultat.prenom=body.prenom;
    resultat.email=body.email;
    resultat.password=body.password;
    resultat.role=body.role;
    resultat.estActif=body.estActif;
    
    const reponse = await resultat.save();
    res.send(reponse);
});



module.exports = routerUsers;