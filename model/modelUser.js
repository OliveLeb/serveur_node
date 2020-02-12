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
async function validationUser(profil){
    const schema = Joi.object({
        nom : Joi.string().min(3).max(50).required(),
        prenom : Joi.string().min(3).max(50).required(),
        password : Joi.string().min(8).max(25).required(),
        email : Joi.string().email({ tlds: { allow: true } }).required(),
        role : Joi.string().valid('admin','redac','user').required(),
        estActif : Joi.boolean().required()
    });
    return schema.validateAsync(profil);
}

module.exports.validationUser = validationUser;
module.exports.User = User;