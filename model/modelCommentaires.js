const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const moment = require('moment');

const schemaComment = mongoose.Schema({
    contenu : String,
    dateCreation : {type:Date, default:(moment().utc(true).toISOString())},
    nomAuteur : String
});

const Comment = mongoose.model("commentaire", schemaComment);
const schema = Joi.object({
    contenu : Joi.string().min(3).max(5000).required(),
    nomAuteur : Joi.string().min(5).max(255).required()
});

module.exports.schema = schema;
module.exports.Comment = Comment;