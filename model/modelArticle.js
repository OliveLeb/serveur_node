

const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const moment = require('moment');

const schemaArticle = mongoose.Schema({
    titre : String,
    contenu : String,
    dateCreation : {type:Date, default:(moment().toISOString())},
    nomAuteur : String,
    emailAuteur : String,
    categorie :[String],
    prix : Number,
    published : Boolean
});

const Article = mongoose.model("article", schemaArticle);
const schema = Joi.object({
    titre : Joi.string().min(3).max(255).required(),
    contenu : Joi.string().min(3).max(3000).required(),
    //dateCreation : Joi.date().required(),
    nomAuteur : Joi.string().min(0).max(255).required(),
    emailAuteur : Joi.string().email().required(),
    categorie : Joi.array().items(Joi.string()).min(2).max(255).required(),
    prix : Joi.number().integer().min(0).max(10000).required(),
    published : Joi.boolean().required()
});

module.exports.schema = schema;
module.exports.Article = Article;