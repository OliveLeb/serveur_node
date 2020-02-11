const mongoose = require("mongoose");
const Joi = require("@hapi/joi");


const schemaUser = mongoose.Schema({
    nom : String,
    prenom : String,
    password : String,
    email : String,
    role : String,
    estActif : Boolean
});

const User = mongoose.model("user", schemaUser);
const schema = Joi.object({
    nom : Joi.string().min(3).max(50).required(),
    prenom : Joi.string().min(3).max(50).required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(25).required(),
    email : Joi.string().email().required(),
    role : Joi.string().min(3).max(20).required(),
    estActif : Joi.boolean().required()
});

module.exports.schema = schema;
module.exports.User = User;